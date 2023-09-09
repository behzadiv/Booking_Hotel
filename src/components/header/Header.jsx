import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiSearch, HiMinus, HiPlus } from "react-icons/hi";
import { useReducer, useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

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

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOption, setOpenOption] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, dispatch] = useReducer(optionsReducer, {
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const handleSearch = () => {
    const decodedParams = createSearchParams({
      //when our params are object
      destination,
      date: JSON.stringify(date),
      options: JSON.stringify(options),
    });
    navigate({ pathname: "/hotels", search: decodedParams.toString() });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem ">
          <MdLocationOn className="locationIcon" />
          <input
            value={destination}
            type="text"
            name="destination"
            placeholder="Where to go?"
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div
          className="headerSearchItem"
          onClick={() => setOpenDate(!openDate)}
        >
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">{`${format(
            date[0].startDate,
            "dd-MM-yyyy"
          )} To ${format(date[0].endDate, "dd-MM-yyyy")} `}</div>
          {openDate && (
            <DateRange
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              className="date"
              moveRangeOnFirstSelection={true}
              minDate={new Date()}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            className="optionDropDown"
            id="optionDropDown"
            onClick={() => {
              setOpenOption(!openOption);
            }}
          >
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {openOption && (
            <GuestOption
              options={options}
              dispatch={dispatch}
              setOpenOption={setOpenOption}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

function GuestOption({ options, dispatch, setOpenOption }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, "optionDropDown", () => setOpenOption(false));

  return (
    <div className="guestOptions" ref={optionRef}>
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
