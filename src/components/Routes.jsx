import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Addresses from '../pages/addresses/Addresses';
import DeliveryType from '../pages/deliveryType/DeliveryType';
import Booking from '../pages/booking/Booking';
import NotFound from '../pages/notFound/NotFound';

function RoutesStructure() {
  const deliveryTypsArray = [
    'store_delivery',
    'small_move',
    'storage_move',
    'junk_removal',
    'craigslist_Pickup',
    'donation_pickup',
    'other'
  ];
  const [chosenDelivery, setChosenDelivery] = useState('');
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const [destinations, setDestinations] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [originSelected, setOriginSelected] = useState();
  const [destenitionSelected, setDestenitionSelected] = useState();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DeliveryType
            deliveryTypsArray={deliveryTypsArray}
            chosenDelivery={chosenDelivery}
            setChosenDelivery={setChosenDelivery}
          />
        }
      />
      <Route
        path="/addresses"
        element={
          <Addresses
            chosenDelivery={chosenDelivery}
            destinations={destinations}
            setDestinations={setDestinations}
            origins={origins}
            setOrigins={setOrigins}
            distance={distance}
            setDistance={setDistance}
            duration={duration}
            setDuration={setDuration}
            originSelected={originSelected}
            setOriginSelected={setOriginSelected}
            destenitionSelected={destenitionSelected}
            setDestenitionSelected={setDestenitionSelected}
          />
        }
      />
      <Route
        path="/booking"
        element={
          <Booking
            distance={distance}
            duration={duration}
            chosenDelivery={chosenDelivery}
            originSelected={originSelected}
            setOriginSelected={setOriginSelected}
            destenitionSelected={destenitionSelected}
            setDestenitionSelected={setDestenitionSelected}
            setChosenDelivery={setChosenDelivery}
            destinations={destinations}
            setDestinations={setDestinations}
            origins={origins}
            setOrigins={setOrigins}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesStructure;
