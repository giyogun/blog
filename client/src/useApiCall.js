import { useCallback, useState } from "react";
import data from "./components/assets/data";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

function useApiCall(applyData) {
  const [dbPosts, setDbPosts] = useState([]);

  const someFunc = (cat) => {
    const filteredPosts = data.filter((m) => m.category.includes(cat));

    return filteredPosts;
  };

  const queryPosts = useCallback(
    async (url, cat = "") => {
      try {
        const response = await axios.get(url);
        // setDbPosts(response.data);
        const data = response.data;

        applyData(data,cat);
      } catch (error) {}
    
      // const response = await axios.get('/posts');
    },
    [applyData]
  );

  const filterPosts = useCallback(async (cat) => {
    const response = await axios.get(`${BASE_URL}/posts`);

    const filteredPosts = response.filter((m) => m.category.includes(cat));
    setDbPosts(filteredPosts);
  }, []);

  const postDateHandler = (x) => {
    let displayedDate;
    const now = new Date();
    const curr = now.getTime();
    const postDate = x.getTime();
    const diff = curr - postDate;
    const inMins = diff * 0.00001667;
    const inHours = diff * 0.0000002778;
    const inDays = inHours * 0.041667;
    displayedDate = `${Math.floor(inMins)} ${
      inMins >= 2 ? "minutes" : "minute"
    } ago`;
    if (inMins > 60) {
      displayedDate = `${Math.floor(inHours)} ${
        inHours >= 2 ? "hours" : "hour"
      } ago`;
    }

    if (inHours > 24) {
      displayedDate = `${Math.floor(inDays)} ${
        inDays >= 2 ? "days" : "day"
      } ago`;
    }

    if (inDays > 6) {
      displayedDate = `${x.getDay() - 1}/${
        x.getMonth() + 1
      }/${x.getFullYear()}`;
    }

    return displayedDate;
  };

  return {
    queryPosts,
    dbPosts,
    filterPosts,
    postDateHandler,
  };
}

export default useApiCall;
