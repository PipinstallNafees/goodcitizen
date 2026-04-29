import successImg from "../assets/community-success.jpg";

export default function About() {
  return (
    <div className="bg-white">
      {/* 🏛️ Header Section */}
      <section className="bg-light py-5 border-bottom">
        <div className="container py-4 text-center">
          <span className="badge bg-primary px-3 py-2 rounded-pill mb-3 fw-bold">OUR STORY</span>
          <h1 className="display-4 fw-black ls-tight mb-3">Rebuilding Civic Trust.</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Good Citizen is more than a reporting tool—it’s a movement to bridge the gap 
            between the people of Bhubaneswar and the systems meant to serve them.
          </p>
        </div>
      </section>

      {/* 🤝 Mission Section with Image */}
      <section className="container py-5 mt-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Why We Exist</h2>
            <p className="text-muted mb-4">
              We believe transparency is the foundation of a functioning democracy. 
              Too often, infrastructure issues like broken roads, water failures, and 
              electricity outages are reported but lost in a bureaucratic "black hole."
            </p>
            <p className="fw-bold text-primary mb-4">
              "When an issue is public, it cannot be ignored."
            </p>
            <p className="text-muted">
              By giving citizens a simple, public space to document issues, we create 
              a visible record of accountability that empowers the community and 
              encourages local officials to act with urgency.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="p-2 bg-white shadow-lg rounded-4 overflow-hidden border">
              <img 
                src={successImg} 
                alt="Community success celebration" 
                className="img-fluid rounded-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ Core Values Grid */}
      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="p-4">
                <div className="fs-1 mb-2">🔓</div>
                <h5 className="fw-bold">Open Data</h5>
                <p className="small text-muted">All reports are public by default, ensuring everyone sees the state of our city.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4">
                <div className="fs-1 mb-2">🤝</div>
                <h5 className="fw-bold">Collaboration</h5>
                <p className="small text-muted">We bridge the communication gap between active residents and government bodies.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4">
                <div className="fs-1 mb-2">📈</div>
                <h5 className="fw-bold">Accountability</h5>
                <p className="small text-muted">By tracking time-to-resolution, we measure and encourage government performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📧 Contact Section */}
      <section className="container py-5 text-center">
        <div className="card border-0 shadow-sm rounded-4 p-5 bg-primary text-white">
          <h2 className="fw-bold mb-4">Get in Touch</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3 mb-md-0">
              <p className="mb-1 opacity-75">Email us</p>
              <h5 className="fw-bold">support@goodcitizen.in</h5>
            </div>
            <div className="col-md-4">
              <p className="mb-1 opacity-75">Visit our HQ</p>
              <h5 className="fw-bold">Bhubaneswar, Odisha, India</h5>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}