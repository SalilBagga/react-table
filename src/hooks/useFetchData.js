import { useState, useEffect } from 'react';

//config
export const useFetchdata = () => {
  const [error, setError] = useState(null);
  const [invalidInput, setInvalidInput] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

      setError(null);
      // sign the user out
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const dataj = await res.json();
        for (let obj of dataj) {
          obj.isDelete = false;
          obj.isEdit = false;
        }
        setData(dataj);
        setError(null);
        setInvalidInput(false);
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    };
    fetchdata();
  }, []);

  return { error, invalidInput, data, setData };
};
