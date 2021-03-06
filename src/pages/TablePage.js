import React, { useState, useEffect } from 'react';
//hooks
import { useFetchdata } from '../hooks/useFetchData';

//Components
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
export default function TablePage() {
  const limit = 10;

  const { error, data, setData } = useFetchdata();
  const [objetindex, setObjectindex] = useState({
    current_page_no: 1,
    current: 0,
    end: limit,
  });
  const [editobject, setEditobject] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [displaydata, setDisplaydata] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [searchlength, setSerchlength] = useState(0);

  useEffect(() => {
    const displayposts = () => {
      let post = data.slice(objetindex.current, objetindex.end);
      setDisplaydata(post);
    };
    if (data != null) {
      displayposts();
    }
  }, [data, objetindex]);

  useEffect(() => {
    if (data != null) {
      if (keyword !== '') {
        let filtered = data.filter((entry) =>
          Object.values(entry).some((val) => typeof val === 'string' && val.includes(keyword))
        );
        setDisplaydata(filtered.slice(objetindex.current, objetindex.end));
        setSerchlength(filtered.length);
      } else {
        let post = data.slice(objetindex.current, objetindex.end);
        setDisplaydata(post);
        setSerchlength(data.length);
      }
    }
  }, [keyword, data, objetindex]);

  const handleSelectedDelete = () => {
    setData((prevstate) => {
      return prevstate.filter((event) => {
        return !event.isDelete;
      });
    });
  };

  const handleSingleDelete = (id) => {
    setData((prevEvents) => {
      return prevEvents.filter((event) => {
        return id !== event.id;
      });
    });
  };

  const handleSingleEdit = (id) => {
    let obj = data[id];
    obj.isEdit = !obj.isEdit;
    data[id] = obj;
    setData([...data]);
  };

  const handleEditDone = (id) => {
    let obj = data[id];
    obj.name = editobject.name !== '' ? editobject.name : obj.name;
    obj.role = editobject.role !== '' ? editobject.role : obj.role;
    obj.email = editobject.email !== '' ? editobject.email : obj.email;
    obj.isEdit = !obj.isEdit;
    data[id] = obj;
    setData([...data]);
  };
  const checkboxhandle = (id) => {
    let obj = data[id];
    obj.isDelete = !obj.isDelete;
    data[id] = obj;
    setData([...data]);
  };
  const multiple_checkbox = (e) => {
    const allcheckbox = e.target.checked;
    var checkboxlist = document.getElementsByName('delete_checkbox');
    if (allcheckbox) {
      for (let i in checkboxlist) {
        if (checkboxlist[i].checked === false) {
          checkboxlist[i].checked = true;
          checkboxhandle(checkboxlist[i].id);
        }
      }
    } else {
      for (let i in checkboxlist) {
        if (checkboxlist[i].checked === true) {
          checkboxlist[i].checked = false;
          checkboxhandle(checkboxlist[i].id);
        }
      }
    }
  };

  return (
    <div>
      {error && (
        <div className="d-flex flex-column align-items-center mt-4">
          <div className="alert alert-danger w-25" role="alert">
            {error}
          </div>
        </div>
      )}
      {data && (
        <div>
          <Search setKeyword={setKeyword} />
          <Table
            checkboxhandle={checkboxhandle}
            displaydata={displaydata}
            handleSingleDelete={handleSingleDelete}
            handleSingleEdit={handleSingleEdit}
            setEditobject={setEditobject}
            handleEditDone={handleEditDone}
            multiple_checkbox={multiple_checkbox}
          />
          <Pagination
            handleSelectedDelete={handleSelectedDelete}
            objetindex={objetindex}
            setObjectindex={setObjectindex}
            datalength={searchlength ? searchlength : data.length}
            limit={limit}
          />
        </div>
      )}
    </div>
  );
}
