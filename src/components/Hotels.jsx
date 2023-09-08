import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";


const Hotels = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;
  const [data,doFetch]=useFetch()
  useEffect(()=>{
    doFetch({url:"/hotels",query:`?q=${destination}&accommodates_gte=${room}`,method:"GET"})
  },[])
  console.log(data);
  return <div>hotel page</div>;
};

export default Hotels;
