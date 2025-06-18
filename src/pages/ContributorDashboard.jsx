
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContributorLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 bg-success text-white sidebar p-3 d-flex flex-column justify-content-between">
          <div>
            <h4 className="text-center mb-4">Contributor Panel</h4>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <button className="btn btn-outline-light w-100 text-start" onClick={() => navigate('/contributor-dashboard')}>
                  My Dashboard
                </button>
              </li>
              <li className="nav-item mb-2">
                <button className="btn btn-outline-light w-100 text-start" onClick={() => navigate('/contributor-dashboard/contributions')}>
                  My Contributions
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

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          {children}
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
            <h2>Welcome, Contributor</h2>
            <p>This is your dashboard.</p>
          </ContributorLayout>
        }
      />
      <Route
        path="contributions"
        element={
          <ContributorLayout>
            <h2>My Contributions</h2>
            <p>See all your submitted contributions here.</p>
          </ContributorLayout>
        }
      />
    </Routes>
  );
}
