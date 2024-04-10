import { useState, useEffect } from "react";
import axios from "axios";

const UseDeleteApi = (url, id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${url}/${id}`);
      setIsDeleted(true);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, isDeleted };
};

export default UseDeleteApi;
