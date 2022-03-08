import { useState, useEffect } from "react";
import iaxios from "../utils/iaxios";

const useFetch = (url, options) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await iaxios(url, options);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error };
};

export default useFetch;
