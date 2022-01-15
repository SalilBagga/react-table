import React from 'react';

export default function Pagination({ datalength, objetindex, setObjectindex, limit, deletearray }) {
  return (
    <div>
      {deletearray.length !== 0 && (
        <div>
          <button className="ml-4">delete selected</button>
        </div>
      )}
      <div>
        {objetindex.current !== 0 && (
          <>
            <button
              onClick={() => {
                setObjectindex((prev) => {
                  return {
                    ...prev,
                    current: 0,
                    end: limit,
                  };
                });
              }}
            >
              <span>&#60;</span>
              <span>&#60;</span>
            </button>
            <button
              onClick={() => {
                setObjectindex((prev) => {
                  return {
                    ...prev,
                    current: objetindex.current - limit,
                    end: objetindex.end - limit,
                  };
                });
              }}
            >
              <span>&#60;</span>
            </button>
          </>
        )}
        {datalength > objetindex.end && (
          <>
            <button
              onClick={() => {
                setObjectindex((prev) => {
                  return {
                    ...prev,
                    current: objetindex.current + limit,
                    end: objetindex.end + limit,
                  };
                });
              }}
            >
              <span>&#62;</span>
            </button>
            <button
              onClick={() => {
                setObjectindex((prev) => {
                  return {
                    ...prev,
                    current: datalength - limit,
                    end: datalength,
                  };
                });
              }}
            >
              <span>&#62;</span>
              <span>&#62;</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
