import { useState } from "react";
import axios from "axios";

function UsePostApi(url) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postData = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });
      setResponse(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, postData };
}

export default UsePostApi;
