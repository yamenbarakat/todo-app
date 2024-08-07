import { useEffect } from "react";

function useLocalStorage(items, filter) {
  useEffect(() => {
    const storeItems = JSON.stringify(items);
    const storeFilter = JSON.stringify(filter);
    localStorage.setItem("items", storeItems);
    localStorage.setItem("filter", storeFilter);
  }, [items, filter]);
}

export default useLocalStorage;
