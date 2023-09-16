import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelDetails = () => {
  const { id } = useParams();
  const [{ loading, data }, doFetch] = useFetch();

  useEffect(() => {
    doFetch({
      url: `/hotels/${id}`,
    });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{data.name}</h2>
        <div>
          {data.number_of_reviews} reviews &bull; {data.host_location}
        </div>
        <img src={data.xl_picture_url} alt="" />
      </div>
    </div>
  );
};

export default HotelDetails;
