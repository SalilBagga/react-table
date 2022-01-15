import React from 'react';

export default function Table({ displaydata, checkboxhandle }) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {displaydata &&
            displaydata.map((data, index) => (
              <tr key={data.id}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={data.id}
                    onClick={() => checkboxhandle(data.id)}
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
