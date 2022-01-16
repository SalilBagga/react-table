import React from 'react';

export default function Search({ setKeyword }) {
  return (
    <div>
      <form>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by Name"
          />
        </div>
      </form>
    </div>
  );
}
