
 import React, { useEffect, useState} from "react";
 import 'bootstrap/dist/css/bootstrap.min.css';
 import Sidebar from '../Components/Sidebar';


export default function ContributorLayout({ children }) {
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
                      <Sidebar username={username} role={role} /> 
                      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
                      
                      </main>
                    </div>
                  </div>
                );
              }

