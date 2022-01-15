import React from 'react';
import { useState, useEffect } from 'react';
//hooks
import { useFetchdata } from '../hooks/useFetchData';

//Components
import Table from '../components/Table';
import Pagination from '../components/Pagination';
export default function TablePage() {
  const limit = 10;

  const { error, invalidInput, data } = useFetchdata();
  // const [currentindex, setCurrentindex] = useState(0);
  // const [endindex, setEndindex] = useState(limit);
  const [objetindex, setObjectindex] = useState({ current: 0, end: limit });
  const [displaydata, setDisplaydata] = useState(null);
  const [deletearray, setDeletearray] = useState([]);

  const checkboxhandle = (id) => {
    var checkBox = document.getElementById(id);
    console.log(checkBox.checked);
    if (checkBox.checked === true) {
      setDeletearray((prev) => {
        return [...prev, id];
      });
    } else {
      setDeletearray((prevEvents) => {
        return prevEvents.filter((event) => {
          return id !== event.id;
        });
      });
    }

    console.log(deletearray);
  };
  useEffect(() => {
    const displayposts = () => {
      let post = data.slice(objetindex.current, objetindex.end);
      setDisplaydata(post);
      let start = Math.abs(Math.floor((objetindex.current - 1) / limit) + 1);
      console.log(objetindex.current, objetindex.end, objetindex);
    };
    if (data != null) {
      displayposts();
    }
  }, [data, objetindex.current, objetindex.end]);

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
          <Table checkboxhandle={checkboxhandle} displaydata={displaydata} />
          <Pagination
            deletearray={deletearray}
            objetindex={objetindex}
            setObjectindex={setObjectindex}
            datalength={data.length}
            limit={limit}
          />
        </div>
      )}
    </div>
  );
}
