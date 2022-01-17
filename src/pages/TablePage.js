import React from 'react';
import { useState, useEffect } from 'react';
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
  const [deletenable, setDeletenable] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searchlength, setSerchlength] = useState(0);
  const checkboxhandle = (id) => {
    let obj = data[id];
    obj.isDelete = !obj.isDelete;
    data[id] = obj;
    console.log(data[id]);
    setData([...data]);
  };

  useEffect(() => {
    const displayposts = () => {
      let post = data.slice(objetindex.current, objetindex.end);
      setDisplaydata(post);
    };
    if (data != null) {
      displayposts();
      setDeletenable(data.length);
      for (let obj of data) {
        if (obj.isDelete) {
          setDeletenable(deletenable - 1);
          console.log('delete');
        }
      }
    }
  }, [data, objetindex, deletenable]);

  const handleSelectedDelete = () => {
    setData((prevstate) => {
      console.log(prevstate);
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
    if (!deletenable) {
      setDeletenable(!deletenable);
    }
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

  useEffect(() => {
    if (data != null && keyword !== '') {
      let filtered = data.filter((entry) =>
        Object.values(entry).some((val) => typeof val === 'string' && val.includes(keyword))
      );
      setDisplaydata(filtered.slice(objetindex.current, objetindex.end));
      setSerchlength(filtered.length);
    }
  }, [keyword, data, objetindex]);

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
          />
          <Pagination
            handleSelectedDelete={handleSelectedDelete}
            deletenable={deletenable}
            objetindex={objetindex}
            setObjectindex={setObjectindex}
            datalength={searchlength ? searchlength : data.length}
            limit={limit}
            searchlength={searchlength}
          />
        </div>
      )}
    </div>
  );
}
