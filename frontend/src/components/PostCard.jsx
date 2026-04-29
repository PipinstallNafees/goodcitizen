import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios.js";

const categoryColors = {
  Roads: "danger", Water: "primary", Electricity: "warning",
  Sanitation: "success", Parks: "info", Other: "secondary",
};

export default function PostCard({ post, onDeleted }) {
  const { user } = useAuth();

  // Show Edit/Delete only if logged-in user is the author
  const isOwner = user && post.author?._id === user.id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    try {
      await api.delete(`/posts/${post._id}`);
      onDeleted(post._id); // remove from Feed without re-fetching
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="card shadow-sm h-100">

      {/* Show image if post has one */}
        {post.imageUrl && (
        <img
            src={`/${post.imageUrl}`}
            alt={post.title}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
        />
        )}

      <div className="card-body">
        <span className={`badge bg-${categoryColors[post.category] || "secondary"} mb-2`}>
          {post.category}
        </span>
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text text-muted">{post.description}</p>
      </div>

      <div className="card-footer d-flex justify-content-between align-items-center">
        <small className="text-muted">
          📍 {post.city} &nbsp;|&nbsp; 👤 {post.author?.name || "Anonymous"}
          <br />
          🕐 {new Date(post.createdAt).toLocaleDateString()}
        </small>

        {isOwner && (
          <div className="d-flex gap-1">
            <button className="btn btn-outline-primary btn-sm">Edit</button>
            <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}