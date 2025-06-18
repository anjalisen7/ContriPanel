import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddContri() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const userName = user?.username || "Contributor";

  const [committees, setCommittees] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.username) {
      fetch("http://localhost/react-projects/ContriApp/Server/api/getContriComitees.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            setCommittees(data.committees);
          }
        });
    }
  }, [user?.username]); // ✅ fix ESLint warning

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCommittee || !amount || !date) {
      Swal.fire("Oops!", "Please fill all fields.", "warning");
      return;
    }

    setLoading(true);

    const payload = {
      username: userName,
      committee: selectedCommittee,
      amount,
      date,
    };

    try {
      const res = await fetch("http://localhost/react-projects/ContriApp/Server/api/addContri.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === "success") {
        Swal.fire("Success", "Contribution added successfully!", "success");
        setSelectedCommittee("");
        setAmount("");
        setDate("");
      } else {
        Swal.fire("Error", data.message || "Failed to add contribution", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <nav className="col-md-3 col-lg-2 bg-success text-white p-3 d-flex flex-column justify-content-between">
          <div>
            <h4 className="text-center mb-4">Contributor Panel</h4>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/contributor-dashboard")}>
              Dashboard
            </button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/contributor-dashboard/AddContri")}>
              Add Contribution
            </button>
            <button className="btn btn-outline-light mb-2 w-100 text-start" onClick={() => navigate("/contributor-dashboard/ContriList")}>
              My Contribution
            </button>
          </div>
          <button
            className="btn btn-danger mt-4"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
          <h2>Add Contribution</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="memberName" className="form-label">Member Name</label>
              <input
                type="text"
                className="form-control bg-secondary text-white"
                id="memberName"
                value={userName}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label htmlFor="committeeName" className="form-label">Committee Name</label>
              <select
                className="form-select"
                id="committeeName"
                value={selectedCommittee}
                onChange={(e) => setSelectedCommittee(e.target.value)}
              >
                <option value="">-- Select Committee --</option>
                {committees.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
