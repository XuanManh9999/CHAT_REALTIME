import { useState, useEffect } from "react";
import axios from "axios";

const UsePutApi = (data, url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const handlePut = async () => {
    try {
      setIsLoading(true);
      const result = await axios.put(url, data);
      setResponse(result.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      handlePut();
    }
  }, [data]);

  return { isLoading, error, response };
};

export default UsePutApi;
