import { Link } from "react-router-dom";
// Assuming you saved the landscape image as 'community-action.jpg' 
// and the vertical image as 'community-success.jpg' in your assets folder.
import heroImg from "../assets/community-action.jpg";
import transparencyImg from "../assets/community-success.jpg";

const steps = [
  { icon: "📝", title: "Sign Up", desc: "Create a free, secure account in seconds." },
  { icon: "📍", title: "Pinpoint & Report", desc: "Submit infrastructure problems, complete with location and description." },
  { icon: "👁️", title: "Public Tracking", desc: "Every report is visible to everyone, creating a transparent public record." },
];

export default function Home() {
  return (
    <>
      {/* 🚀 New Split Hero Section: Text + Action Image */}
      <section className="bg-primary text-white py-5 min-vh-75 d-flex align-items-center">
        <div className="container py-lg-5">
          <div className="row align-items-center g-5">
            {/* Left: Content */}
            <div className="col-lg-6">
              <h1 className="display-2 fw-black ls-tight mb-4">Your Voice.<br />Your <span className="text-warning">City.</span></h1>
              <p className="lead mt-3 mb-5 opacity-75">
                Broken roads, water failures, electricity outages. They disrupt lives. 
                <strong className="d-block mt-2">Good Citizen gives you the power to report issues publicly and keep the government accountable.</strong>
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/feed" className="btn btn-warning btn-lg rounded-pill px-5 fw-bold shadow">View Reports</Link>
                <Link to="/signup" className="btn btn-outline-light btn-lg rounded-pill px-5">Join the Movement</Link>
              </div>
            </div>
            {/* Right: Modern Image Container (Landscape Image) */}
            <div className="col-lg-6 d-none d-lg-block">
              <div className="p-3 bg-white shadow-lg rounded-5 overflow-hidden">
                <img 
                  src={heroImg} 
                  alt="Citizens working in a community garden" 
                  className="img-fluid rounded-4"
                  style={{ objectFit: 'cover', height: '400px', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ Modernized How It Works Section */}
      <section className="py-5 bg-white">
        <div className="container py-4">
          <h2 className="text-center fw-black mb-1">Make a Difference in 3 Steps</h2>
          <p className="text-center text-muted mb-5 pb-3">From identification to accountability</p>
          
          <div className="row g-4 justify-content-center">
            {steps.map((step, i) => (
              <div className="col-md-4" key={i}>
                <div className="card text-center h-100 shadow-sm border-0 p-4 rounded-4 hover-lift">
                  <div className="d-flex justify-content-center mb-4 mt-2">
                    <div className="display-4 p-3 bg-primary bg-opacity-10 rounded-circle text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h5 className="fw-bold mb-3">{step.title}</h5>
                  <p className="text-muted small px-lg-3">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 👁️ NEW Transparency Section: Feature + Vertical Image */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left: Vertical Image Section */}
            <div className="col-lg-5 order-2 order-lg-1">
              <div className="p-3 bg-white shadow-lg rounded-5">
                <img 
                  src={transparencyImg} 
                  alt="Volunteers smiling around the Community Garden sign" 
                  className="img-fluid rounded-4 shadow-sm"
                />
              </div>
            </div>
            {/* Right: Clarity & Content */}
            <div className="col-lg-7 order-1 order-lg-2">
              <span className="badge bg-primary text-uppercase px-3 py-2 rounded-pill mb-3 fw-bold ls-tight">TRANSFERS POWER TO YOU</span>
              <h2 className="fw-black display-5 mb-4 ls-tight">Transparency<br />Is Not Negotiable.</h2>
              <p className="text-muted lead mb-4">
                Good Citizen isn't a private complaint box. Every report you submit—every broken pipe, 
                every pothole—is tracked on a <strong className="text-primary">public timeline.</strong>
              </p>
              <p className="text-muted mb-5">
                This public record ensures issues can't be quietly ignored. It puts the collective pressure 
                of your neighborhood on officials, ensuring timely action and true accountability.
              </p>
              <Link to="/about" className="btn btn-primary btn-lg rounded-pill fw-bold">Learn More About Transparency</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}