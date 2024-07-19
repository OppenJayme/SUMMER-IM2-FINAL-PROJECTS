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

  const handleNotification = () => {
    setNotification((prev) => !prev);
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
                <th>Employee Created</th>
                <th># Items Added</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.fname} {employee.lname}</td>
                  <td>{employee.employeeemail}</td>
                  <td>{employee.employeecontact}</td>
                  <td>{employee.date_created}</td>
                  <td>123</td>
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
