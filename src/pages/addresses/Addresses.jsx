/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { DistanceMatrixService } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

import './Addresses.css';
import Autocomplete from 'react-google-autocomplete';
import ChangeDeliveryComponent from '../../components/changeDeliveryComponent/CahngeDeliveryComponent';
import ArrowUp from '../../assets/images/ArrowUp.svg';
import ArrowDown from '../../assets/images/ArrowDown.svg';
import MovingApatment from '../../assets/images/MovingApatment.svg';
function Addresses({
  chosenDelivery,
  distance,
  setDistance,
  duration,
  setDuration,
  originSelected,
  setOriginSelected,
  destenitionSelected,
  setDestenitionSelected,
  setDestinations,
  destinations,
  origins,
  setOrigins
}) {
  const shouldRun = useRef(true);
  const autoComplete = useRef();
  const autoComplete2 = useRef();

  const reset = () => {
    autoComplete.current.value = '';
    autoComplete2.current.value = '';
    setDistance();
    setDuration();

    setOrigins([]);
    setDestinations([]);
  };
  useEffect(() => {
    if (origin?.length && destinations?.length) {
      shouldRun.current = true;
    }
  }, [destinations?.length, origins?.length, distance, duration]);

  const distanceCallback = (response) => {
    try {
      if (response.rows[0].elements[0].status.toLowerCase() === 'ok') {
        setDistance(response.rows[0].elements[0].distance);
        setDuration(response.rows[0].elements[0].duration);
        shouldRun.current = false;
      } else {
        alert(
          'Server Error form google calculation. Tere might be some reasons for this. try to choose places from the same region (two Israelies places for example), or to relaod the app if nothing help'
        );
        reset();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const options = {
    types: ['geocode', 'establishment']
  };
  const apiKey = process.env.REACT_APP_API_KEY;
  return (
    <div className="addresses">
      <ChangeDeliveryComponent chosenDelivery={chosenDelivery} />
      <div className="addresses-component-body-container">
        <div className="arrow-and-input-container">
          <div className="arrow-container">
            <img className="arrow-svg" src={ArrowUp} alt={'svg'} />
          </div>

          <div className="label-and-autocomplete-container">
            <label className="auto-complete-label">Pick up from</label>
            <Autocomplete
              defaultValue={originSelected && originSelected}
              onChange={() => setOrigins()}
              ref={autoComplete}
              placeholder="type and select origin's address"
              apiKey={apiKey}
              options={options}
              onPlaceSelected={(place) => {
                setOrigins([
                  {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  }
                ]);
                setOriginSelected(autoComplete.current.value);
              }}
            />
          </div>
        </div>
        <hr className="hr-header" />
        {destinations && distance && origins?.length > 0 && destinations?.length > 0 && (
          <div className="continue-or-reset">
            <Link to="/booking" className="continue-to-booking">
              continue to booking
            </Link>
            <div onClick={reset}>or reset</div>
          </div>
        )}
        <div className="arrow-and-input-container">
          <div className="arrow-container">
            <img className="arrow-svg" src={ArrowDown} alt={'svg'} />
          </div>

          <div className="label-and-autocomplete-container">
            <label className="auto-complete-label">Pick up from</label>
            <Autocomplete
              defaultValue={destenitionSelected && destenitionSelected}
              onChange={() => {
                setDestinations();
              }}
              ref={autoComplete2}
              placeholder="type and select address"
              apiKey={apiKey}
              options={options}
              onPlaceSelected={(place) => {
                setDestinations([
                  {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  }
                ]);
                setDestenitionSelected(autoComplete2.current.value);
              }}
            />
          </div>
        </div>

        {window?.google && shouldRun.current && (
          <DistanceMatrixService
            ref={shouldRun}
            options={{
              destinations: destinations,
              origins: origins,

              travelMode: 'DRIVING'
            }}
            callback={distanceCallback}
          />
        )}

        <div className="moving-apatment-svg-container">
          <img className="MovingApatment-svg" src={MovingApatment} alt={'MovingApatment svg'} />
        </div>
        <footer>
          <p>
            All our Luggers are equipped with the necessary tools such as straps, blankets and wrap
            to protect your items.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Addresses;
