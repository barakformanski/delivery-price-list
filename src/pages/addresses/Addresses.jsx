import { useEffect, useRef, useState } from "react";
import { DistanceMatrixService } from "@react-google-maps/api";
import { Link } from "react-router-dom";

import "./Addresses.css";
import Autocomplete from "react-google-autocomplete";
import ChangeDeliveryComponent from "../../components/changeDeliveryComponent/CahngeDeliveryComponent";
import ArrowUp from "../../assets/images/ArrowUp.svg";
import ArrowDown from "../../assets/images/ArrowDown.svg";
import MovingApatment from "../../assets/images/MovingApatment.svg";
function Addresses({
  chosenDelivery,
  distance,
  setDistance,
  duration,
  setDuration,
  setOriginSelected,
  setDestenitionSelected,
}) {
  const [destinations, setDestinations] = useState([]);
  const [origins, setOrigins] = useState([]);
  const shouldRun = useRef(true);
  const autoComplete = useRef();
  const autoComplete2 = useRef();
  const [typing, setTyping] = useState(false);

  const reset = () => {
    setOrigins([]);
    setDestinations([]);
    autoComplete.current.value = "";
    autoComplete2.current.value = "";
    setDistance();
    setDuration();
  };
  useEffect(() => {
    if (origin?.length && destinations?.length) {
      // if (distance && duration)
      console.log("Distance & Duration have updated", distance, duration);
      shouldRun.current = true;
    }
  }, [destinations?.length, origins?.length, distance, duration]);

  const distanceCallback = (response) => {
    try {
      if (response.rows[0].elements[0].status.toLowerCase() === "ok") {
        console.log("distanc inside CB", distance);
        console.log("duration inside CB", duration);
        console.log("response", response);
        setDistance(response.rows[0].elements[0].distance);
        setDuration(response.rows[0].elements[0].duration);
        shouldRun.current = false;
      } else {
        alert(
          "Error on google calculation for your choicesץ Tere might be some reasins for this. try to choose places from the same region (two Israelies paces for example), or to relaod the app"
        );
        reset();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="addresses">
      <ChangeDeliveryComponent chosenDelivery={chosenDelivery} />
      <div className="addresses-component-body-container">
        <div className="arrow-and-input-container">
          <div className="arrow-container">
            <img className="arrow-svg" src={ArrowUp} alt={"svg"} />
          </div>

          <div className="label-and-autocomplete-container">
            <label className="auto-complete-label">Pick up from</label>
            <Autocomplete
              onChange={(e) => setTyping(true)}
              ref={autoComplete}
              placeholder="type and select origin's address"
              apiKey={process.env.REACT_APP_API_KEY}
              onPlaceSelected={(place) => {
                console.log(place);
                console.log("Lat", place?.geometry?.location?.lat());
                console.log("Lng", place?.geometry?.location?.lng());
                setOrigins([
                  {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                ]);
                setTyping(false);
                setOriginSelected(autoComplete.current.value);
              }}
            />
            {console.log("autoComplete", autoComplete)}
          </div>
        </div>
        <hr className="hr-header" />
        {destinations &&
          distance &&
          autoComplete?.current?.value &&
          autoComplete2?.current?.value &&
          !typing && (
            <div className="continue-or-reset">
              <Link to="/booking" className="continue-to-booking">
                continue to booking
              </Link>
              <div onClick={reset}>or reset</div>
            </div>
          )}
        <div className="arrow-and-input-container">
          <div className="arrow-container">
            <img className="arrow-svg" src={ArrowDown} alt={"svg"} />
          </div>

          <div className="label-and-autocomplete-container">
            <label className="auto-complete-label">Pick up from</label>
            <Autocomplete
              onChange={(e) => setTyping(true)}
              ref={autoComplete2}
              placeholder="type and select address"
              apiKey={process.env.REACT_APP_API_KEY}
              onPlaceSelected={(place) => {
                console.log(place);
                console.log("Lat", place?.geometry?.location?.lat());
                // console.log("typeof", typeof place?.geometry?.location?.lat());
                console.log("Lng", place?.geometry?.location?.lng());
                setDestinations([
                  {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                ]);
                setTyping(false);
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
              // destinations: [{ lat: 1.296788, lng: 103.778961 }],
              // origins: [{ lng: 103.780267, lat: 1.291692 }],
              // @ts-ignore:Type '"DRIVING"' is not assignable to type 'TravelMode'// Type '"DRIVING"' is not assignable to type 'TravelMode'
              travelMode: "DRIVING",
            }}
            callback={distanceCallback}
          />
        )}
        {/* <div>distance:{distance && distance.text}</div>
        {console.log("DISTANCE", distance)}
        <div> duration:{duration && duration.text}</div> */}

        <div className="moving-apatment-svg-container">
          <img
            className="MovingApatment-svg"
            src={MovingApatment}
            alt={"MovingApatment svg"}
          />
        </div>
        <footer>
          <p>
            {" "}
            All our Luggers are equipped with the necessary tools such as
            straps, blankets and wrap to protect your items.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Addresses;
