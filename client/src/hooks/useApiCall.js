import { useCallback, useState } from "react";
import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";

function useApiCall(applyData) {
  const [res, setRes] = useState(null);

  const queryPosts = useCallback(
    async (config, cat = "", title = undefined, id=null) => {
      if (config.method === "GET") {
        try {
          const response = await axios.get(config.url);
          // setDbPosts(response.data);
          const data = response.data;

          applyData(data, cat, title,id);
        } catch (error) {}
      }

      if (config.method === "POST") {
        try {
          const response = await axios.post(config.url, config.body);
          // setDbPosts(response.data);
          const data = response;

          applyData(data);
          // setRes(data.statusText);
        } catch (err) {
          // const x = new Error(err.message);
          // setRes(err.response.data)
          // console.log(err.response.data);
          applyData(err.response.data)
        }
      }

      // const response = await axios.get('/posts');
    },
    [applyData]
  );


  return {
    queryPosts,
    res
  };
}

export default useApiCall;
