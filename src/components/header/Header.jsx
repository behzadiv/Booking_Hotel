import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch } from "react-icons/hi";
import { useState } from "react";

const Header = () => {
  const [destination, setDestination] = useState("");

  return (
    <div className="headerSearch">
      <div className="headerSearchItem ">
        <MdLocationOn className="locationIcon" />
        <input
          type="text"
          name="destination"
          placeholder="Where to go?"
          onChange={(e) => setDestination(e.target.value)}
        />
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <HiCalendar className="headerIcon dateIcon" />
        <div className="dateDropDown">2023/03/20</div>
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <div className="optionDropDown">
          1adult &bull; 2children &bull;2room
        </div>
        <span className="seperator"></span>
      </div>
      <div className="headerSearchItem">
        <button className="headerSearchBtn">
          <HiSearch className="headerIcon" />
        </button>
      </div>
    </div>
  );
};

export default Header;
