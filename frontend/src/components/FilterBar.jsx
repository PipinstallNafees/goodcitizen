const CATEGORIES = ["Roads", "Water", "Electricity", "Sanitation", "Parks", "Other"];

export default function FilterBar({ city, setCity, category, setCategory, onSearch, onReset }) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="row g-3 align-items-end">

          <div className="col-md-4">
            <label className="form-label fw-semibold">City</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Bhubaneswar"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4 d-flex gap-2">
            <button className="btn btn-primary w-100" onClick={onSearch}>
              🔍 Search
            </button>
            <button className="btn btn-outline-secondary w-100" onClick={onReset}>
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}