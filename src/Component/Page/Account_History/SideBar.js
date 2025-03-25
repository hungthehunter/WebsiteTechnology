import { IonIcon } from "@ionic/react";
import {
    bagHandleOutline,
    eyeOutline,
    locationOutline,
    logOutOutline,
    personOutline,
} from "ionicons/icons";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../../Config/config";
import "./css/style.scss";

const SidebarAccountHistory = ({ activeIndex, menuActive, handleMouseOver, setActiveComponent }) => {
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLoginLogout = () => {
        if (isLoggedIn) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userEmail");
            setIsLoggedIn(false);
            setEmail("");
            navigate(`${BASE_PATH}/Login`);
        } else {
            navigate(`${BASE_PATH}/Login`);
        }
    };

    return (
        <div className={`navigation ${menuActive ? "active" : ""}`}>
            <ul>
                <li>
                  {}
                </li>
                {[
                    { icon: personOutline, title: "Account Information", link: `/${BASE_PATH}/AccountDetail`, component: "AccountDetail" },
                    { icon: locationOutline, title: "Address Detail", link: `/${BASE_PATH}/AccountAddress`, component: "AccountAddress" },
                    { icon: bagHandleOutline, title: "Order manage", link: `/${BASE_PATH}/AccountOrder`, component: "AccountOrder" },
                    { icon: eyeOutline, title: "Product History", link: `/${BASE_PATH}/AccountProductHistory`, component: "AccountProductHistory" },
                   
                ].map((item, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? "hovered" : ""}
                        onMouseOver={() => handleMouseOver(index)}
                    >
                        <a href="#" onClick={() => setActiveComponent({ name: item.component })}>
                            <span className="icon">
                                <IonIcon icon={item.icon} style={{ fontSize: "2.5rem" }} />
                            </span>
                            <span className="title">{item.title}</span>
                        </a>
                    </li>
                ))}
                <li
                    onMouseOver={() => handleMouseOver(9)}
                    className={activeIndex === 9 ? "hovered" : ""}
                    onClick={handleLoginLogout}
                >
                    <a href="#">
                        <span className="icon" style={{ lineHeight: "60px" }}>
                            <IonIcon icon={logOutOutline} style={{ fontSize: "2.5rem" }} />
                        </span>
                        <span className="title">Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SidebarAccountHistory;