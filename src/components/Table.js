import React from 'react';

export default function Table({
  displaydata,
  checkboxhandle,
  handleSingleDelete,
  handleSingleEdit,
  setEditobject,
  handleEditDone,
}) {
  return (
    <div>
      <form id="formid"></form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {displaydata &&
            displaydata.map((data, index) =>
              data.isEdit ? (
                <tr key={data.id}>
                  <td></td>
                  <td>{data.id}</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={data.name}
                      form="formid"
                      onChange={(e) =>
                        setEditobject((prev) => {
                          return {
                            ...prev,
                            name: e.target.value,
                          };
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      defaultValue={data.email}
                      form="formid"
                      onChange={(e) =>
                        e.target.value ? console.log(e.target.value) : console.log('no changes')
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      defaultValue={data.role}
                      form="formid"
                      onChange={(e) =>
                        setEditobject((prev) => {
                          return {
                            ...prev,
                            role: e.target.value,
                          };
                        })
                      }
                    />
                  </td>
                  <td>
                    <button className="btn" onClick={() => handleEditDone(index)}>
                      submit
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={data.id}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={data.id}
                      onClick={() => checkboxhandle(index)}
                    />
                  </td>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.role}</td>
                  <td>
                    <button className="btn" onClick={() => handleSingleEdit(index)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn" onClick={() => handleSingleDelete(data.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
