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
          console.error(sessionError);
          throw sessionError;
        }
        const user = sessionData?.session.user;
        
        const { data: userData, error: userError } = await supabase
          .from('employee_t')
          .select('companyid')
          .eq('employeeemail', user.email)
          .single();
        if (userError) {
          console.error(userError);
          throw userError;
        }

        const { data: employeeData, error } = await supabase
          .from('employee_t')
          .select('*')
          .eq('companyid', userData.companyid);
        if (error) {
          console.error(error);
        } else {
          setEmployees(employeeData);
        }
      } catch (err) {
        console.error(err.message);
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
      <h1>Employees</h1>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeid}>
              <td>{employee.employeeid}</td>
              <td>{employee.fname}</td>
              <td>{employee.lname}</td>
              <td>{employee.employeeemail}</td>
              <td>{employee.employeecontact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Employees;
