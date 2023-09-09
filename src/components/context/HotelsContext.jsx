import { createContext, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelsContext = createContext();

const HotelsProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination") || "";
  const room = JSON.parse(searchParams.get("options"))?.room || 1;
  const [{ data, loading }, doFetch] = useFetch();
  useEffect(() => {
    doFetch({
      url: "/hotels",
      query: `?q=${destination}&accommodates_gte=${room}`,
      method: "GET",
    });
  }, [searchParams]);

  return (
    <HotelsContext.Provider value={{ loading, hotels: data }}>
      {children}
    </HotelsContext.Provider>
  );
};
export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
