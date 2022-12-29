/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowUp from '../../assets/images/ArrowUp.svg';
import ArrowDown from '../../assets/images/ArrowDown.svg';
import deliveryOptions from './assets/mockDataDeliveryOptions';
import ChangeDeliveryComponent from '../../components/changeDeliveryComponent/CahngeDeliveryComponent';
import './Booking.css';
import { calculatePrice } from './assets/calculatePrice';

function Booking({
  distance,
  duration,
  chosenDelivery,
  originSelected,
  destenitionSelected,
  setOriginSelected,
  setDestenitionSelected,
  setChosenDelivery,
  setDestinations,
  setOrigins
}) {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [submitModal, setsubmitModal] = useState(false);
  const [buttonClassName, setButtonClassName] = useState('car-svg');
  const [selectedOption, setSelectedOption] = useState(null);

  const renderModal = (pricePerKm, pricePerMin, modalType, totalPrice) => {
    if (modalType === 'errorModal') {
      return (
        <Link to="/addresses">
          not distance/duration calculated- go back and choose address again
        </Link>
      );
    }
    return (
      <div className={modalType === 'submitModal' ? 'modal-list-submitted' : 'modal-list'}>
        {modalType === 'submitModal' && <p>booking succedded!</p>}
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
        {modalType === 'submitModal' && (
          <>
            <p>Total-price={totalPrice}$</p>
            <button
              type="button"
              onClick={() => {
                setsubmitModal(false);
                setButtonClassName('car-svg');
                setOriginSelected('');
                setDestenitionSelected('');
                setChosenDelivery('');

                navigate('/');
              }}>
              Order Another Delivery
            </button>
          </>
        )}
      </div>
    );
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
    setButtonClassName('car-svg-animation');
    setOrigins([]);
    setDestinations([]);
  };

  useEffect(() => {
    if (!distance || !duration) {
      setErrorModal(true);
    }
  });

  return (
    <div className="booking-page">
      {errorModal && <div style={{}}>{renderModal(null, null, 'errorModal')}</div>}
      <div>
        <ChangeDeliveryComponent chosenDelivery={chosenDelivery} disabled={submitModal} />
      </div>
      <div className="booking-page-inner-container">
        <div className="address-container">
          <div className="arrow-svg-container-bokking">
            <img className="arrow-svg" src={ArrowUp} alt="arrow svg" />
          </div>
          <div className="address-details">{originSelected}</div>
        </div>
        <hr className="hr-header" />

        <div className="address-container">
          <div className="arrow-svg-container-bokking">
            <img className="arrow-svg" src={ArrowDown} alt="arrow svg" />
          </div>
          <div className="address-details">{destenitionSelected}</div>
        </div>
        {deliveryOptions.map((opt, index) => (
          <div key={opt.title} className="booking-opt-li-container">
            <div
              className="opt-li-details"
              onMouseOver={() => handleHover(index)}
              onMouseLeave={() => handleLeave()}
              onFocus={() => handleHover(index)}
              onBlur={() => handleLeave()}>
              <p className="opt-title">{opt.title}</p>
              <p className="opt-description">{opt.description}</p>

              {distance && duration ? (
                <p className="opt-price">
                  {calculatePrice(opt.pricePerKm, distance, opt.pricePerMin, duration)}$
                </p>
              ) : (
                <p>can not calculate price</p>
              )}
            </div>
            <img className={buttonClassName} src={opt.img} alt="arrow svg" />
            <button
              type="submit"
              className="booking-button"
              disabled={!!(buttonClassName === 'car-svg-animation' || !distance || !duration)}
              onClick={() => {
                handleSubmit(index);
              }}>
              Book
            </button>
            <div
              style={{
                display: index === selectedOption ? 'contents' : 'none'
              }}>
              {modal &&
                renderModal(
                  deliveryOptions[index].pricePerKm,
                  deliveryOptions[index].pricePerMin,
                  'detailsModal'
                )}
              {submitModal &&
                renderModal(
                  opt.pricePerKm,
                  opt.pricePerMin,
                  'submitModal',
                  calculatePrice(opt.pricePerKm, distance, opt.pricePerMin, duration)
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;
