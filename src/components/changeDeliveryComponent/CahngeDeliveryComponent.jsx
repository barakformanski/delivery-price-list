import { Link } from "react-router-dom";
import "./ChangeDeliveryComponent.css";

function ChangeDeliveryComponent({ chosenDelivery, disabled }) {
  return (
    <div className="change-type-container">
      {chosenDelivery.replace("_", " ")}
      {!disabled && (
        <Link className="link-to-home" to="/">
          change
        </Link>
      )}
    </div>
  );
}

export default ChangeDeliveryComponent;
