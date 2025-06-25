import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '../Components/Button';

export default function Sidebar({ username = "", role = "" }) {

  const navigate = useNavigate();
   const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };

  const isAdmin = role === "Admin" || username === "Admin";

  return (
    <nav  className={`col-md-3 col-lg-2 ${
    isAdmin ? "bg-primary" : "bg-success"
  } text-white p-3 d-flex flex-column justify-content-between`}>
      <div>
        <h4 className="text-center mb-4">{isAdmin ? "Admin Panel" : "Contributor Panel"}</h4>

        <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        {isAdmin ? (
          <>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/add-user")}>
              Add / Modify User
            </button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/committees")}>
              Committee List
            </button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/contributions")}>
              View Collection
            </button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/dashboard/winner")}>
              Pick Winner (30th)
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/contributor-dashboard/AddContri")}>
          Add Contribution
            </button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/contributor-dashboard/ContriList")}>
              My Contribution
            </button>
          </>
        )}
      </div>

            <Button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "red", color: "#fff", border: "none",width:"100" }}
                   onClick={handleLogout}
                >

                  Logout
                </Button>

      {/* <button className="btn btn-danger mt-4" onClick={() => navigate("/")}>
        Logout
      </button> */}
    </nav>
  );
}
