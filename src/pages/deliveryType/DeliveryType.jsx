import { useNavigate } from "react-router-dom";
import "./DeliveryType.css";
import chooseSvgObject from "./utils/chooseSvgObject";

const DeliveryType = ({
  deliveryTypsArray,
  chosenDelivery,
  setChosenDelivery,
}) => {
  const navigate = useNavigate();

  return (
    <div className="Delivery_type_container">
      <div className="grid_parent">
        {deliveryTypsArray.map((type, index) => {
          return (
            <div
              className={
                type !== chosenDelivery
                  ? `img_container img_container${index + 1}`
                  : `img_container img_container${index + 1} chosen-type`
              }
              key={type}
              onClick={() => {
                setChosenDelivery(type);
                navigate("addresses");
              }}
            >
              <img
                className="delivery-type-svg"
                src={chooseSvgObject[type]}
                alt={"svg"}
              />
              <div className="image_title">{type.replace("_", " ")}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryType;
