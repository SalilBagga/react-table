import React from 'react';

export default function Pagination({
  datalength,
  objetindex,
  setObjectindex,
  limit,
  handleSelectedDelete,
}) {
  let pagearray = [];
  let numberofpages = Math.abs(Math.ceil(datalength / limit));
  for (var i = 1; i <= numberofpages; i++) {
    pagearray.push(i);
  }

  return (
    <div>
      <div className="d-flex">
        <div style={{ marginRight: '35%' }}>
          <button onClick={() => handleSelectedDelete()} className=" btn btn-danger mt-1">
            delete selected
          </button>
        </div>
        <div className="d-flex justify-content-center">
          {objetindex.current !== 0 && (
            <>
              <button
                className="btn btn-primary   mr-1"
                onClick={() => {
                  setObjectindex((prev) => {
                    return {
                      ...prev,

                      current_page_no: 1,
                      current: 0,
                      end: limit,
                    };
                  });
                }}
              >
                <i className="bi bi-chevron-double-left"></i>
              </button>
              <button
                className="btn btn-primary  mx-1"
                onClick={() => {
                  setObjectindex((prev) => {
                    return {
                      ...prev,
                      current_page_no: objetindex.current_page_no - 1,
                      current: objetindex.current - limit,
                      end: objetindex.end - limit,
                    };
                  });
                }}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
            </>
          )}
          {pagearray &&
            pagearray.length > 0 &&
            pagearray.map((item) => (
              <div key={item}>
                {objetindex.current_page_no === item ? (
                  <button
                    key={item}
                    className="btn btn-danger"
                    onClick={() => {
                      setObjectindex((prev) => {
                        return {
                          ...prev,
                          current_page_no: item,
                          current: (item - 1) * limit,
                          end: item * limit,
                        };
                      });
                    }}
                  >
                    {item}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setObjectindex((prev) => {
                        return {
                          ...prev,
                          current_page_no: item,
                          current: (item - 1) * limit,
                          end: item * limit,
                        };
                      });
                    }}
                  >
                    {item}
                  </button>
                )}
              </div>
            ))}
          {datalength > objetindex.end && (
            <>
              <button
                className="btn btn-primary mx-1"
                onClick={() => {
                  setObjectindex((prev) => {
                    return {
                      ...prev,
                      current_page_no: objetindex.current_page_no + 1,
                      current: objetindex.current + limit,
                      end: objetindex.end + limit,
                    };
                  });
                }}
              >
                <i className="bi bi-chevron-compact-right"></i>
              </button>
              <button
                className="btn btn-primary   mr-1"
                onClick={() => {
                  setObjectindex((prev) => {
                    return {
                      ...prev,
                      current_page_no: pagearray.length,
                      current: datalength - limit,
                      end: datalength,
                    };
                  });
                }}
              >
                <i className="bi bi-chevron-double-right"></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
