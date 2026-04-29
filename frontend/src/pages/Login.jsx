import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
// You can use a different volunteer image here for variety
import loginImg from "../assets/signup-side.jpg"; 

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      {/* Main Wrapper - Same constraints as Signup for consistency */}
      <div className="row g-0 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "1000px", width: "100%", minHeight: "600px" }}>
        
        {/* Left Side: Image Section (Hidden on mobile) */}
        <div className="col-md-6 d-none d-md-block">
          <div 
            style={{ 
              backgroundImage: `url(${loginImg})`, 
              backgroundSize: "cover", 
              backgroundPosition: "center",
              height: "100%",
              minHeight: "100%" 
            }} 
            aria-label="Good citizens helping the community"
          />
        </div>

        {/* Right Side: Form Section */}
        <div className="col-md-6 bg-white d-flex align-items-center p-4 p-lg-5">
          <div className="w-100">
            <div className="text-center mb-4">
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted">Log in to continue reporting issues</p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit}>
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
                <div className="d-flex justify-content-between">
                    <label className="form-label fw-semibold small">Password</label>
                    <Link to="/forgot-password" style={{ fontSize: '0.8rem' }} className="text-decoration-none">Forgot?</Link>
                </div>
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
                Login
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="small text-muted">
                Don't have an account? <Link to="/signup" className="text-decoration-none fw-bold">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}