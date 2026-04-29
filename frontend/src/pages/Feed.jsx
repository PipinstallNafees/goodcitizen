import { useState, useEffect } from "react";
import api from "../api/axios.js";
import PostCard from "../components/PostCard.jsx";
import FilterBar from "../components/FilterBar.jsx";

export default function Feed() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [city, setCity]       = useState("");
  const [category, setCategory] = useState("");

  const fetchPosts = async (cityFilter = "", categoryFilter = "") => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (cityFilter)     params.city     = cityFilter;
      if (categoryFilter) params.category = categoryFilter;

      const res = await api.get("/posts", { params });
      setPosts(res.data);
    } catch (err) {
      setError("Failed to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all posts on first load
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = () => fetchPosts(city, category);

  const handleReset = () => {
    setCity("");
    setCategory("");
    fetchPosts();
  };

  // Remove deleted post from state without re-fetching
  const handlePostDeleted = (deletedId) => {
    setPosts((prev) => prev.filter((p) => p._id !== deletedId));
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">📋 Public Issue Feed</h2>
      <p className="text-muted mb-4">
        Browse all reported issues from citizens across the country.
      </p>

      <FilterBar
        city={city}
        setCity={setCity}
        category={category}
        setCategory={setCategory}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Loading reports...</p>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-5 text-muted">
          <h4>No reports found.</h4>
          <p>Try a different city or category, or be the first to report!</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <p className="text-muted mb-3">
            Showing <strong>{posts.length}</strong> report(s)
          </p>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {posts.map((post) => (
              <div className="col" key={post._id}>
                <PostCard post={post} onDeleted={handlePostDeleted} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}