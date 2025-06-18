import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/react-projects/ContriApp/Server/api/login.php",
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
        console.error("❌ JSON parse error:", parseError);
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
      console.error("❌ Fetch error:", err);
      Swal.fire("Error", "Unable to connect to server", "error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">🔐 Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
