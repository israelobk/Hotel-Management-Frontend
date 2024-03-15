import React, { useEffect, useState } from "react";
import Button from "../../elements/Button";
import InputNumber from "../../elements/Form/InputNumber";
import InputDate from "../../elements/Form/InputDate";
import BookingHotelDetails from "./BookingHotelDetails";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../../actions/bookingActions";
import Crown1 from "/images/Crown1.jpg";
import Crown2 from "/images/Crown2.jpg";
import Crown3 from "/images/Crown3.jpg";


const BookingForm = () => {

  const dispatch = useDispatch();

  const [getItem, setItem] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dates, setDates] = useState({ startDate: new Date(), endDate: new Date() });

  const addRoom = (booking, count) => {

    dispatch(addBooking(booking, count));

  };

  const rooms = [
    {
      id: 1,
      name: "Deluxe",
      description: "",
      thumbnail: Crown1,
      roomDetail: "avg/Night",
      price: 50000,
    },
    {
      id: 2,
      name: "Classic",
      description: "",
      thumbnail: Crown2,
      roomDetail: "avg/Night",
      price: 63000,
    },
    {
      id: 3,
      name: "Exotic",
      description: "",
      thumbnail: Crown3,
      roomDetail: "avg/Night",
      price: 54000,
    },
  ];

  const { loading, roomTypes, error } = useSelector(state => state.hotelDetails);
  // const { total } = useSelector(state => state.bookings);

  const updateDate = (target) => {
    console.log({target});
    const nights = (target.endDate - target.startDate) / 86400000;
    if (nights > 0) localStorage.setItem("total", totalPrice * nights);
    setDates({ startDate: target.startDate, endDate: target.endDate });

    // console.log({dateDiff: (target.endDate - target.startDate) / 86400000 });
    // console.log({target});
  };

  useEffect(() => {
    const total = localStorage.getItem("total");
    setTotalPrice(total);
    //  console.log({ total });
    // if(total) setTotalPrice(total);
  }, [getItem, dates, getItem]);

  return (
    <div className="card bordered" style={{ padding: "60px 30px" }}>
      <h4 className="mb-4">START BOOKING</h4>
      <div className="hotelDetails_container">
        {roomTypes && roomTypes.map((room, index) => {

          return (
            <div key={index}>
              <BookingHotelDetails
                room={room}
                dates={dates}
                // total={totalPrice}
                click={() => setItem(!getItem)}
                // click={(t) => {setTotalPrice(t)}}
                idx={index}
              />
              {index < rooms.length - 1 ? <hr /> : <></>}
            </div>
          );
        })}
      </div>
      <hr className="bg-dark border-2 border-top border-dark mt-4" />
      <div className="check-in m-4">
        <label htmlFor="date">Check In - Check Out</label>
        <InputDate
          onChange={updateDate}
          name="date"
          value={dates}
        />
      </div>
      <hr className="bg-danger border-2 border-top border-dark" />

      <div className="text-center mb-3">
        <h3>Total Price:</h3>
        {/* {total && <span>₦{total}</span>} */}
        <span>{totalPrice}</span>
      </div>

      <Button
        className="btn pt-2"
        hasShadow
        isPrimary
        isBlock
        type="link"
        href="/checkout"
        style={{ textDecoration: "none" }}
      >
        Book Now
      </Button>
    </div>
  );
};

export default BookingForm;
