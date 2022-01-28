import React from 'react';

export default function Search({ setKeyword }) {
  const formonsubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={(e) => formonsubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            onChange={(e) => {
              setKeyword(e.target.value.trim());
            }}
            placeholder="Search by Name / ID / Role"
          />
        </div>
      </form>
    </div>
  );
}
