import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ArrowUp from "../../assets/images/ArrowUp.svg";
import ArrowDown from "../../assets/images/ArrowDown.svg";
import PickUp1 from "../../assets/images/PickUp1.svg";
import PickUp2 from "../../assets/images/PickUp2.svg";
import Van2 from "../../assets/images/Van2.svg";
import VanXl from "../../assets/images/VanXl.svg";

import ChangeDeliveryComponent from "../../components/changeDeliveryComponent/CahngeDeliveryComponent";
import "./Booking.css";
import { calculatePrice } from "./calculatePrice";
const Booking = ({
  distance,
  duration,
  chosenDelivery,
  originSelected,
  destenitionSelected,
}) => {
  const navigate = useNavigate();

  const deliveryOptions = [
    {
      title: "Pickup 1 Lugger",
      description: "Single item and small loads",
      img: PickUp1,
      pricePerKm: 0.01,
      pricePerMin: 0.01,
    },
    {
      title: "Pickup 2 Lugger",
      description: "Single item and small loads",
      img: PickUp2,
      pricePerKm: 0.02,
      pricePerMin: 0.02,
    },
    {
      title: "Van 2 Lugger",
      description: "Room full of stuff",
      img: Van2,
      pricePerKm: 0.03,
      pricePerMin: 0.03,
    },
    {
      title: "XL 2 Luggers",
      description: "Studio and 1 bedroom apts",
      img: VanXl,
      pricePerKm: 0.04,
      pricePerMin: 0.04,
    },
  ];
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [submitModal, setsubmitModal] = useState(false);
  const [buttonClassName, setButtonClassName] = useState("car-svg");
  const [selectedOption, setSelectedOption] = useState(null);

  const renderModal = (pricePerKm, pricePerMin, modalType, totalPrice) => {
    console.log("modalType", modalType);
    console.log("selectedOption", selectedOption);

    if (modalType === "errorModal") {
      return (
        <Link to="/addresses">
          not distance/duration calculated- go back and choose addres again
        </Link>
      );
    } else {
      return (
        <div
          className={
            modalType === "submitModal" ? "modal-list-submitted" : "modal-list"
          }
        >
          {modalType === "submitModal" && <p>booking succedded!</p>}
          <p>Distance :{distance.text}</p>
          <p>
            Duration:
            {duration.text}
          </p>
          <p>
            Price per min:
            {pricePerMin}
          </p>
          <p>
            Price ker km:
            {pricePerKm}
          </p>
          {modalType === "submitModal" && (
            <>
              <p>Total-price={totalPrice}$</p>
              <button
                onClick={() => {
                  setsubmitModal(false);
                  setButtonClassName("car-svg");
                  navigate("/");
                }}
              >
                Order Another Delivery
              </button>
            </>
          )}
        </div>
      );
    }
  };
  const handleLeave = () => {
    setSelectedOption();

    setModal(false);
  };
  const handleHover = (index) => {
    setSelectedOption(index);
    setModal(true);
  };
  const handleSubmit = (index) => {
    setSelectedOption(index);
    setsubmitModal(true);
    setButtonClassName("car-svg-animation");
  };

  useEffect(() => {
    (!distance || !duration) && setErrorModal(true);
  });

  return (
    <div className="booking-page">
      {errorModal && (
        <div style={{}}>{renderModal(null, null, "errorModal")}</div>
      )}
      <div>
        <ChangeDeliveryComponent chosenDelivery={chosenDelivery} />
      </div>
      <div className="booking-page-inner-container">
        <div className="address-container">
          <div className="arrow-svg-container-bokking">
            <img className="arrow-svg" src={ArrowUp} alt={"arrow svg"} />
          </div>
          <div className="address-details">{originSelected}</div>
        </div>
        <hr className="hr-header" />

        <div className="address-container">
          <div className="arrow-svg-container-bokking">
            <img className="arrow-svg" src={ArrowDown} alt={"arrow svg"} />
          </div>
          <div className="address-details">{destenitionSelected}</div>
        </div>
        {deliveryOptions.map((opt, index) => {
          return (
            <div key={opt.title} className={"booking-opt-li-container"}>
              <div
                className="opt-li-details"
                onMouseOver={() => handleHover(index)}
                onMouseLeave={() => handleLeave()}
              >
                <p className="opt-title">{opt.title}</p>
                <p className="opt-description">{opt.description}</p>
                {console.log("distance", distance)}
                {console.log("duration", duration)}
                {distance && duration ? (
                  <p className="opt-price">
                    {calculatePrice(
                      opt.pricePerKm,
                      distance,
                      opt.pricePerMin,
                      duration
                    )}
                    $
                  </p>
                ) : (
                  <p>can not calculate price</p>
                )}
              </div>
              <img
                className={buttonClassName}
                src={opt.img}
                alt={"arrow svg"}
              />
              <button
                className={"booking-button"}
                disabled={
                  buttonClassName === "car-svg-animation" ||
                  !distance ||
                  !duration
                    ? true
                    : false
                }
                onClick={() => {
                  handleSubmit(index);
                }}
              >
                Book
              </button>
              <div
                style={{
                  display: index === selectedOption ? "contents" : "none",
                }}
              >
                {modal
                  ? renderModal(
                      deliveryOptions[index].pricePerKm,
                      deliveryOptions[index].pricePerMin,
                      "detailsModal"
                    )
                  : submitModal
                  ? renderModal(
                      opt.pricePerKm,
                      opt.pricePerMin,
                      "submitModal",
                      calculatePrice(
                        opt.pricePerKm,
                        distance,
                        opt.pricePerMin,
                        duration
                      )
                    )
                  : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Booking;
