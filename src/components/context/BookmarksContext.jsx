import { createContext, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const BookmarksContext = createContext();

const BookmarksProvider = ({ children }) => {
  const [{ data, loading }, doFetch] = useFetch();
  
  useEffect(() => {
    doFetch({
      url: "/bookmarks",
      method: "GET",
    });
  }, []);

  return (
    <BookmarksContext.Provider
      value={{
        loading,
        bookmarks: data,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};
export default BookmarksProvider;

export function useBookmarks() {
  return useContext(BookmarksContext);
}
