import React ,{useState,useEffect}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from '../Components/Sidebar';


 export default function DashboardLayout({ children }) {

             const [username, setUsername] = useState(""); 
            const [role, setRole] = useState("");
                      useEffect(() => {
                        const storedUser = localStorage.getItem("user");
                        if (storedUser) {
                          const parsed = JSON.parse(storedUser);
                          if (parsed.username) setUsername(parsed.username);
                          if (parsed.role) setRole(parsed.role);
                        }
                      }, []);
                      return (
                        <div className="container-fluid">
                          <div className="row min-vh-100">
                            {/* Sidebar */}
                              <Sidebar username={username} role={role} />
                            {/* Main content */}
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                              {children}
                            </main>
                          </div>
                        </div>
                      );
                    }

