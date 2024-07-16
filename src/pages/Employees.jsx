import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
import supabase from "../client/database";
import "../styles/Employees.css";
import LoadingScreen from "../components/LoadingScreen";
import Ivan from "../styles/images/Ivan.jpg";

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

      <div className="employees_content">
        <div className="employees_container">

          <div className="employee-display-card">

              <img src={Ivan} alt="" />

            <div className="employee-details">
              <h1><i class="bi bi-person-fill"></i>Employee Name</h1>
              <p><i class="bi bi-envelope-at-fill"></i>Employee Email</p>
              <p><i class="bi bi-telephone-fill"></i>Contact Number</p>
            </div>

          <div className="chatboxdiv">
            <i class="bi bi-chat-dots-fill"></i>
          </div>
          

          </div>

        </div>
      </div>
    </>
  );
};

export default Employees;
