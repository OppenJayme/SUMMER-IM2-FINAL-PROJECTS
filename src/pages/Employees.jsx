import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
import supabase from "../client/database";
import "../styles/Employees.css";
import LoadingScreen from "../components/LoadingScreen";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showNotification, setNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [companyEmail, setCompanyEmail] = useState(null);

  const handleNotification = () => {
    setNotification((prev) => !prev);
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const { error } = await supabase
        .from('employee_t')
        .delete()
        .eq('employeeid', employeeId);
      if (error) {
        throw error;
      }
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.employeeid !== employeeId));
    } catch (err) {
      console.error("Error deleting employee:", err.message);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Session Error:", sessionError);
          throw sessionError;
        }
        const user = sessionData?.session?.user;
        console.log("User:", user);

        if (!user) {
          throw new Error("No user is logged in.");
        }
        setUserEmail(user.email);

        const { data: userData, error: userError } = await supabase
          .from('employee_t')
          .select('companyid')
          .eq('employeeemail', user.email)
          .single();
        if (userError) {
          console.error("User Data Error:", userError);
          throw userError;
        }
        console.log("User Data:", userData);

        const { data: companyData, error: companyError } = await supabase
          .from('company_t')
          .select('companyemail')
          .eq('companyid', userData.companyid)
          .single();
        if (companyError) {
          console.error("Company Data Error:", companyError);
          throw companyError;
        }
        setCompanyEmail(companyData.companyemail);
        console.log("Company Data:", companyData);

        const { data: employeeData, error } = await supabase
          .from('employee_t')
          .select('*')
          .eq('companyid', userData.companyid);
        if (error) {
          console.error("Employee Data Error:", error);
        } else {
          setEmployees(employeeData);
          console.log("Employee Data:", employeeData);
        }
      } catch (err) {
        console.error("Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SideNav />

      <div className="notif">
        <i className="bi bi-bell-fill" onClick={handleNotification}></i>
        {showNotification && <Notification />}
      </div>

      <div className="employees_content">
        <div className="employees_table_container">
          <table className="employees_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Account Created</th>
                <th># Items Added</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeid}>
                  <td>{employee.fname} {employee.lname}</td>
                  <td>{employee.employeeemail}</td>
                  <td>{employee.employeecontact}</td>
                  <td>{employee.date_created}</td>
                  <td>123</td>
                  {userEmail === companyEmail && (
                    <td className="delete_button_container">
                      <button onClick={() => deleteEmployee(employee.employeeid)} className="delete_button">
                        <i className="bi bi-person-x-fill"></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employees;
