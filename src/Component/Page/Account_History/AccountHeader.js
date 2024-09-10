import { IonIcon } from "@ionic/react";
import { menuOutline, searchOutline } from "ionicons/icons";
import icon from "../../Assests/ICON";
import "./css/style.scss";
const AccountHeader = ({ toggleMenu, MenuActive }) => {
  return (
    <div className="topbar">
      <div className="toggle" onClick={toggleMenu}>
        <IonIcon icon={menuOutline} style={{ fontSize: "3.5rem" }} />
      </div>
      <div className="search">
        <label>
          <input type="text" placeholder="Search here" />
          <IonIcon
            icon={searchOutline}
            style={{
              position: "absolute",
              top: 9,
              bottom: 0,
              left: 10,
              fontSize: "2rem",
            }}
          />
        </label>
      </div>
      <div className="user">
        <img src={icon.nvidia_notext} alt="" />
      </div>
    </div>
  );
};

export default AccountHeader;