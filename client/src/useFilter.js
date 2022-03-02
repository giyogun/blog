import data from "./components/assets/data";

function useFilter() {
  
  const someFunc = (cat) => {
    const filteredPosts = data.filter((m) => m.category.includes(cat));
    
  
    return filteredPosts
  };

  return {
    someFunc
  }
}

export default useFilter;

