import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from "classnames/bind";
import { useState } from 'react';
import Header from "../Header";
import styles from "./DefaultLayout.module.scss";
import Sidebar from "./Sidebar";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <div className={cx("wrapper")}>
      <Header toggleSidebar={toggleSidebar} /> {/* Truyền toggleSidebar vào Header */}
      <div className={cx("container")}>
        <Sidebar show={showSidebar} onClose={closeSidebar} />

        {/* Overlay */}
        {showSidebar && (
          <div
            className={cx("overlay")}
            onClick={closeSidebar}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          />
        )}

        <div className={cx("content")}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
