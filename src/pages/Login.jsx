import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Components/Button";
import Input from "../Components/Input";

  const API = process.env.REACT_APP_API_BASE;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API}/login.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const raw = await response.text();
      console.log("🧾 Server raw response:", raw);

      let data;
      try {
        data = JSON.parse(raw);
      } catch (parseError) {
       
        Swal.fire("Error", "Invalid server response format!", "error");
        return;
      }

      if (data.status === "success") {
        const role = data.role;
        localStorage.setItem("user", JSON.stringify({ username, role }));

        Swal.fire({
          title: "Login Successful!",
          text: `Welcome ${username}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          if (role === "Admin") {
            navigate("/dashboard");
          } else if (role === "Contributor") {
            navigate("/contributor-dashboard");
          } else {
            Swal.fire("Error", "Unknown role. Contact admin.", "error");
          }
        });
      } else {
        Swal.fire("Login Failed", data.message || "Invalid credentials", "error");
      }
    } catch (err) {
   
      Swal.fire("Error", "Unable to connect to server", "error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">🔐 Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
          

             <Input
              label="Username"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autocomplete="off"
              required
            />

          </div>

          <div className="mb-3">
          
              <Input
                label="Password"
                id="password"
                placeholder="Enter password"
                value={password}
                 autocomplete="off"
                onChange={(e)=> setPassword(e.target.value)}
              />
          </div>
          <Button
            type="submit"
            className="btn"
            style={{ backgroundColor: "green", color: "#fff", border: "none",width:"100" }}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
