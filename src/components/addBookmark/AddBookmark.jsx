import useUrlLocation from "../../hooks/useUrlLocation";

const AddBookmark = () => {
  const [lat, lng] = useUrlLocation();
  console.log(lat, lng);
  return (
    <div>
      <h2>Add bookmark : </h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName:</label>
          <input name="cityName" id="cityName" />
        </div>
        <div className="formControl">
          <label htmlFor="country">country:</label>
          <input name="country" id="country" />
        </div>
        <div className="buttons">
          <button className="btn btn--back">&larr; back</button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddBookmark;
