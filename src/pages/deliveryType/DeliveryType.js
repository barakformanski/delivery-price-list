import { useNavigate } from "react-router-dom";
import "./DeliveryType.css";
import store_delivery from "../../assets/images/store_delivery.svg";
import small_move from "../../assets/images/small_move.svg";
import storage_move from "../../assets/images/storage_move.svg";
import junk_removal from "../../assets/images/junk_removal.svg";
import craigslist_Pickup from "../../assets/images/craigslist_Pickup.svg";
import donation_pickup from "../../assets/images/donation_pickup.svg";
import other from "../../assets/images/other.svg";
const DeliveryType = ({
  deliveryTypsArray,
  chosenDelivery,
  setChosenDelivery,
}) => {
  const navigate = useNavigate();

  const chooseSvg = (type) => {
    switch (type) {
      case "store_delivery":
        return store_delivery;
      case "small_move":
        return small_move;
      case "storage_move":
        return storage_move;
      case "junk_removal":
        return junk_removal;
      case "craigslist_Pickup":
        return craigslist_Pickup;
      case "donation_pickup":
        return donation_pickup;
      case "other":
        return other;
      default:
        return "error";
    }
  };
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
              {console.log(type)}
              <img
                className="delivery-type-svg"
                src={chooseSvg(type)}
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
