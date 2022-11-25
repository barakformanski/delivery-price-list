import { Link } from "react-router-dom";
import "./ChangeDeliveryComponent.css";

function ChangeDeliveryComponent({ chosenDelivery }) {
  return (
    <div className="change-type-container">
      {chosenDelivery.replace("_", " ")}
      <Link className="link-to-home" to="/">
        change
      </Link>
    </div>
  );
}

export default ChangeDeliveryComponent;
