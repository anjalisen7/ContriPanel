import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContributorLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.username || "Contributor";

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
     
        <nav className="col-md-3 col-lg-2 bg-success text-white sidebar p-3 d-flex flex-column justify-content-between">
          <div>
            <h4 className="text-center mb-2">Contributor Panel</h4>
            <p className="text-center fw-bold">👤 Welcome, {userName}</p>

            <ul className="nav flex-column mt-3">
              <li className="nav-item mb-2">
                <button
                  className="btn btn-outline-light w-100 text-start"
                  onClick={() => navigate('/contributor-dashboard')}
                >
                  My Dashboard
                </button>
              </li>
              <li className="nav-item mb-2">
                <button
                  className="btn btn-outline-light w-100 text-start"
                  onClick={() => navigate('/contributor-dashboard/AddContri')}
                >
                  Add Contribution
                </button>
              </li>
               <li className="nav-item mb-2">
                <button
                  className="btn btn-outline-light w-100 text-start"
                  onClick={() => navigate('/contributor-dashboard/ContriList')}
                >
                 My Contribution
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-auto">
            <button
              className="btn btn-danger w-100 mt-4"
              onClick={() => {
                localStorage.removeItem("user");
                navigate('/');
              }}
            >
              Logout
            </button>
          </div>
        </nav>

       
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
         
        </main>
      </div>
    </div>
  );
}


export default function ContributorDashboard() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ContributorLayout>
            <h2>Welcome to Your Dashboard</h2>
            <p>This is your personal contributor panel where you can manage your contributions.</p>
          </ContributorLayout>
        }
      />
      <Route
        path="AddContri"
        element={
          <ContributorLayout>
            <h2>My Contributions</h2>
            <p>Here you can add or view your contributions.</p>
          </ContributorLayout>
        }
      />
      <Route
        path="ContriList"
        element={
          <ContributorLayout>
            <h2>My Contributions</h2>
            <p>Here you can add or view your contributions.</p>
          </ContributorLayout>
        }
      />
    </Routes>
  );
}
