import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const CATEGORIES = ["Roads", "Water", "Electricity", "Sanitation", "Parks", "Other"];

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Chandigarh", "Puducherry",
];

export default function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm]             = useState({ title: "", category: "", description: "", city: "", state: "" });
  const [image, setImage]           = useState(null);
  const [preview, setPreview]       = useState(null);
  const [error, setError]           = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.category || !form.description || !form.city || !form.state) {
      return setError("All fields are required.");
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title",       form.title);
      formData.append("category",    form.category);
      formData.append("description", form.description);
      formData.append("city",        form.city);
      formData.append("state",       form.state);
      if (image) formData.append("image", image);

      // Single API call — backend handles both saving post AND sending email
      await api.post("/posts", formData);

      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "600px" }}>
      <h2 className="fw-bold mb-1">📝 Report an Issue</h2>
      <p className="text-muted mb-4">Help your community by reporting infrastructure problems.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <input
            name="title"
            className="form-control"
            placeholder="e.g. Broken streetlight on MG Road"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Category</label>
          <select name="category" className="form-select" value={form.category} onChange={handleChange}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">City</label>
            <input
              name="city"
              className="form-control"
              placeholder="e.g. Bhubaneswar"
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">State</label>
            <select name="state" className="form-select" value={form.state} onChange={handleChange}>
              <option value="">Select a state</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={4}
            placeholder="Describe the issue in detail..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Photo <span className="text-muted fw-normal">(optional, max 5MB)</span>
          </label>
          <input
            type="file"
            className="form-control"
            accept="image/jpeg, image/jpg, image/png, image/webp"
            onChange={handleImageChange}
          />
          {preview && (
            <div className="mt-3">
              <p className="text-muted small mb-1">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded border"
                style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
              />
              <button
                type="button"
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={handleRemoveImage}
              >
                ✕ Remove Image
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </button>

      </form>
    </div>
  );
}