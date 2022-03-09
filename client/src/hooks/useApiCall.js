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

          applyData(response, cat, title,id);
        } catch (err) {
          applyData(err.response.data)
        }
      }

      if (config.method === "POST") {
        try {
          const response = await axios.post(config.url, config.body);

          applyData(response);
        } catch (err) {
          applyData(err.response.data)
        }
      }

      if (config.method === "PUT") {
        try {
          const response = await axios.put(config.url, config.body);

          applyData(response);
        } catch (err) {
          applyData(err.response.data)
        }
      }

    },
    [applyData]
  );


  return {
    queryPosts,
    res
  };
}

export default useApiCall;
