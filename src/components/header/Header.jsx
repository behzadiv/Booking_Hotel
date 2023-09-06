import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch, HiMinus, HiPlus } from "react-icons/hi";
import { useState } from "react";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);

  return (
    <div className="header">
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
          <div
            className="optionDropDown"
            onClick={() => {
              setOpenOption(!openOption);
            }}
          >
            1adult &bull; 2children &bull;2room
          </div>
          {openOption && <GuestOption />}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

function GuestOption() {
  return (
    <div className="guestOptions">
      <OptionItem />
      <OptionItem />
      <OptionItem />
    </div>
  );
}

function OptionItem() {
  return (
    <div className="guestOptionItem">
      <span className="optionText">adult</span>
      <div className="optionCounter">
        <button className="optionCounterBtn">
          <HiMinus className="icon" />
        </button>
        <span>1</span>
        <button className="optionCounterBtn">
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
