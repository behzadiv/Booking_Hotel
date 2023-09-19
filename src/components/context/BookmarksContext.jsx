import { createContext, useContext, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

const BookmarksContext = createContext();

const BookmarksProvider = ({ children }) => {
  const [{ data, loading }, doFetch] = useFetch();
  const [
    { data: singleBookmarkData, loading: singleBookmarkLoading },
    fetchSingleBookmark,
  ] = useFetch();

  const getSingleBookmark = (id) => {
    fetchSingleBookmark({
      url: `/bookmarks/${id}`,
    });
  };

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
        currentBookmark: singleBookmarkData,
        singleBookmarkLoading,
        getSingleBookmark,
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
