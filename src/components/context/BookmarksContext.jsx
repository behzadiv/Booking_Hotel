import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const BookmarksContext = createContext();

const BookmarksProvider = ({ children }) => {
  const [{ data, loading }, doFetch] = useFetch();
  const [
    { data: singleBookmarkData, loading: singleBookmarkLoading },
    fetchSingleBookmark,
  ] = useFetch();
  const [, postData] = useFetch();
  const [, deleteData] = useFetch();
  const [addedNewBookmark, setAddedNewBookmark] = useState(true);

  const getSingleBookmark = (id) => {
    fetchSingleBookmark({
      url: `/bookmarks/${id}`,
    });
  };
  const getBookmarkData = () => {
    doFetch({
      url: "/bookmarks",
      method: "GET",
    });
  };

  useEffect(() => {
    addedNewBookmark && getBookmarkData();
    setAddedNewBookmark(false);
  }, [addedNewBookmark]);

  const createBookmarks = (newBookmark) => {
    postData({
      url: "/bookmarks",
      method: "POST",
      data: newBookmark,
    });
    getSingleBookmark(newBookmark.id);
    setAddedNewBookmark(true);
  };
  const deleteBookmark = (id) => {
    console.log(id);
    deleteData({
      url: `/bookmarks/${id}`,
      method: "DELETE",
    });
    setAddedNewBookmark(true);
  };

  return (
    <BookmarksContext.Provider
      value={{
        loading,
        bookmarks: data,
        currentBookmark: singleBookmarkData,
        singleBookmarkLoading,
        getSingleBookmark,
        createBookmarks,
        deleteBookmark,
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
