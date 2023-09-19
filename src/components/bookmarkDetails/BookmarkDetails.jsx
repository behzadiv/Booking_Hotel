import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookmarks } from "../context/BookmarksContext";

const BookmarkDetail = () => {
  const { id } = useParams();
  const {
    singleBookmarkLoading: loading,
    currentBookmark: data,
    getSingleBookmark,
  } = useBookmarks();

  useEffect(() => {
    getSingleBookmark(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  console.log(data);
  return <div>bookmark detail</div>;
};

export default BookmarkDetail;
