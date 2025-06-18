import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddUserComponent from './AddUserComponent';
import CommitteeListComponent from './CommitteeListComponent';


function DashboardLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-primary text-white sidebar p-3 d-flex flex-column justify-content-between">
          <div>
            <h4 className="text-center mb-4">Admin Panel</h4>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <button className="btn btn-outline-light w-100 text-start" onClick={() => navigate('/')}>
                  Dashboard
                </button>
              </li>
              <li className="nav-item mb-2">
               <button
              className="btn btn-outline-light w-100 text-start"
              onClick={() => navigate('/Dashboard/add-user')}
            >
              Add / Modify User
            </button>
              </li>

                <li className="nav-item mb-2">
               <button
              className="btn btn-outline-light w-100 text-start"
              onClick={() => navigate('/Dashboard/committees')}
            >
              Committees List
            </button>
              </li>

              <li className="nav-item mb-2">
                <button className="btn btn-outline-light w-100 text-start" onClick={() => navigate('contributions')}>
                  View Contributions
                </button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-light w-100 text-start" onClick={() => navigate('winner')}>
                  Pick Winner (30th)
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <button className="btn btn-danger w-100 mt-4" onClick={() => navigate('/')}>
              Logout
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <h2>Dashboard</h2>
            <p>Welcome to the ContriBution Dashboard!</p>
          </DashboardLayout>
        }
      />
      
    <Route
  path="add-user"
  element={
    <DashboardLayout>
      <h2>Add / Modify User</h2>
      <AddUserComponent />
    </DashboardLayout>
  }
/>
   <Route
    path="committees"
    element={
      <DashboardLayout>
        <h2 className="mb-4">Committee List</h2>
        <CommitteeListComponent />
      </DashboardLayout>
    }
  />

      <Route
        path="/contributions"
        element={
          <DashboardLayout>
            <h2 className="mb-4">Contributions</h2>
            <p>View all user contributions.</p>
          </DashboardLayout>
        }
      />
      <Route
        path="/winner"
        element={
          <DashboardLayout>
            <h2 className="mb-4">Pick Winner</h2>
            <p>Pick a random winner on the 30th.</p>
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
