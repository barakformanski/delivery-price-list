/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import './DeliveryType.css';
import chooseSvgObject from './utils/chooseSvgObject';

const DeliveryType = ({ deliveryTypsArray, chosenDelivery, setChosenDelivery }) => {
  const navigate = useNavigate();

  return (
    <div className="delivery-type-container">
      <div className="grid-parent">
        {deliveryTypsArray.map((type, index) => {
          return (
            <div
              className={
                type !== chosenDelivery
                  ? `img-container img-container${index + 1}`
                  : `img-container img-container${index + 1} chosen-type`
              }
              key={type}
              onClick={() => {
                setChosenDelivery(type);
                navigate('addresses');
              }}>
              <img className="delivery-type-svg" src={chooseSvgObject[type]} alt={'svg'} />
              <div className="image-title">{type.replace('_', ' ')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryType;
