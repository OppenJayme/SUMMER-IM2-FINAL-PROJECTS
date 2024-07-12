import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
import supabase from "../client/database";
import "../styles/Employees.css";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showNotification, setNotification] = useState(false);
    
  const handleNotification = () => {
    setNotification(prev => !prev);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from('employee_t')
        .select('*');

      if (error) {
        console.error(error);
      } else {
        setEmployees(data);
      }
    };

    fetchEmployees();
  }, []);

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
          {employees.map(employee => (
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
