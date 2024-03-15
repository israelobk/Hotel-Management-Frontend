/* eslint-disable react/prop-types */
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";

import { useEffect, useState } from "react";
import Button from "../../elements/Button";

import { useDispatch, useSelector } from "react-redux";

import { addBooking } from "../../../actions/bookingActions";


const BookingHotelDetails = (props) => {

  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const { id, thumbnail, name, description, price, hotelId } = props.room;
  const { startDate, endDate } = props.dates;
  const idx = props.idx;

  // const { total } = useSelector(state => state.bookings);

  const decrementCount = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addRoom = (key) => {
    props.click();
    const nights = endDate - startDate;
    console.log({ endDate, startDate, nights });

    localStorage.setItem(key, endDate ? price * count * nights : price * count);

    const booking = {
      hotelId,
      price,
      roomId: id,
      checkIn: startDate,
      endDate: endDate
    }
    dispatch(addBooking(booking, count));

    // props.click(total);

    // {
    //   dateRange:
    //  }
  };

  useEffect(() => {
    const total =
      parseInt(localStorage.getItem("1")) +
      parseInt(localStorage.getItem("2")) +
      parseInt(localStorage.getItem("3")) +
      parseInt(localStorage.getItem("4")) ;
    localStorage.setItem("total", total);

    console.log({ dates: props.dates });
  }, [count, startDate, endDate, props.dates]);

  return (
    <>
      <div
        className="hotelDetails"
        style={{ display: "flex" }}
      >
        <div style={{ display: "flex" }} className="">
          <img
            src={thumbnail}
            alt=""
            style={{ width: "120px", height: "70px", marginRight: "5px" }}
          />
          <div style={{ display: "block", width: "100%" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{name}</h2>
            <p style={{ fontSize: "14px" }}>
            ₦{price.toLocaleString()} <span style={{ fontSize: "10px" }}>avg/Night</span>
            </p>
          </div>
        </div>
        <div style={{ display: "block", alignItems:"center", width: "100%" }} className="">
          <div
            style={{
              alignItems: "center",
              justifyContent: "end",
              display: "flex",
            }}
            className="mb-2"
          >
            <span onClick={decrementCount}>
              <FaSquareMinus className="minus" />
            </span>
            <span className="text-black text-l font-normal font-Inter leading-7 counter-style">
              {count}
            </span>
            <span onClick={incrementCount}>
              <FaSquarePlus className="plus" />
            </span>
          </div>
          <Button
            className="btn"
            hasShadow
            isPrimary
            isBlock
            onClick={addRoom(idx + 1)}
          >
            Add Room
          </Button>
        </div>
      </div>
      <p style={{ fontSize: "15px", fontWeight: "600" }} className="mt-1">{description}</p>
    </>
  );
};

export default BookingHotelDetails;
