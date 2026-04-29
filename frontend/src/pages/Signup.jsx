import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import signupImg from "../assets/signup-side.jpg"; 

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    try {
      await signup(form.name, form.email, form.password);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      {/* Main Wrapper: 
          - Max-width keeps it from getting too wide on huge monitors
          - Shadow and rounded corners make it look like a cohesive unit
      */}
      <div className="row g-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "1000px", width: "100%", minHeight: "600px" }}>
        
        {/* Left Side: Image Section */}
        <div className="col-md-6 d-none d-md-block">
          <div 
            style={{ 
              backgroundImage: `url(${signupImg})`, 
              backgroundSize: "cover", 
              backgroundPosition: "center",
              height: "100%",
              minHeight: "100%" 
            }} 
            aria-label="Volunteers working together"
          />
        </div>

        {/* Right Side: Form Section */}
        <div className="col-md-6 bg-white d-flex align-items-center p-4 p-lg-5">
          <div className="w-100">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Create Account</h2>
              <p className="text-muted">Join the Good Citizen community</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-semibold small">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                Sign Up
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="small text-muted">
                Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}