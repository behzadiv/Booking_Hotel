import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch, HiMinus, HiPlus } from "react-icons/hi";
import { useReducer, useState } from "react";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOption, setOpenOption] = useState(false);
  const optionsReducer = (state, action) => {
    switch (action.type) {
      case "decrement":
        return { ...state, [action.payload]: state[action.payload] - 1 };
      case "increment":
        return { ...state, [action.payload]: state[action.payload] + 1 };
      default:
        return state;
    }
  };
  const [options, dispatch] = useReducer(optionsReducer, {
    adult: 1,
    children: 0,
    room: 1,
  });

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
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {openOption && <GuestOption options={options} dispatch={dispatch} />}
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

function GuestOption({ options, dispatch }) {
  return (
    <div className="guestOptions">
      <OptionItem
        title="adult"
        dispatch={dispatch}
        minValue={1}
        options={options}
      />
      <OptionItem
        title="children"
        dispatch={dispatch}
        minValue={0}
        options={options}
      />
      <OptionItem
        title="room"
        dispatch={dispatch}
        minValue={1}
        options={options}
      />
    </div>
  );
}

function OptionItem({ title, dispatch, options, minValue }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{title}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[title] <= minValue}
        >
          <HiMinus
            className="icon"
            onClick={() => {
              dispatch({ type: "decrement", payload: title });
            }}
          />
        </button>
        <span>{options[title]}</span>
        <button className="optionCounterBtn">
          <HiPlus
            className="icon"
            onClick={() => {
              dispatch({ type: "increment", payload: title });
            }}
          />
        </button>
      </div>
    </div>
  );
}
