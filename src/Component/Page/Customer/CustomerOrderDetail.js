import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../../Assests/ICON';
import PICTURE from '../../Assests/PICTURE';
import './CustomerOrderDetail.scss';
const OrderDetail = () => {
  const openSidebar = () => {
    document.getElementById("main").style.marginLeft = "25%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  };

  const closeSidebar = () => {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("openNav").style.display = "inline-block";
  };

  const handleWarning = () => {
    alert("Xử lí thành công !");
  };

  return (
    <div className="CustomerOrderDetail">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" to="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link rel="stylesheet" to="style_OrderDetail.css" />
        <title>Chi tiết đơn hàng</title>
      </head>
      <body>
        <header>
          <nav>
            <ul className="navbar-list">
              <li className="left">
                <Link to="/">
                <img
                  src={icon.nvidia}
                  alt="nvidia-icon"
                  style={{ width: 110, height: 44 }}
                ></img>
                </Link>
              </li>
              <div className="right">
                <li>
                  <input type="text" placeholder="Tên sản phẩm..." />
                  <Link to=""><i className="fa-solid fa-magnifying-glass"></i></Link>
                </li>
                <li>
                  <i className="fa-solid fa-circle-user"></i> Admin
                </li>
              </div>
            </ul>
          </nav>
        </header>
        <main>
          <side id="mySidebar">
            <ul>
              <li><Link onClick={closeSidebar}>Đóng &times;</Link></li>
              <li><Link to="/websiteDoAn/orderAdmin">Đơn hàng</Link></li>
              <li><Link to="/websiteDoAn/userAdmin">Người dùng</Link></li>
            </ul>
          </side>
          <section id="main">
            <button id="openNav" className="menu-button" onClick={openSidebar}>&#9776; Menu</button>
            <h2>Chi Tiết Đơn Hàng</h2>
            <h1>Danh sách sản phẩm</h1>
            <hr />
            {/* <table>
  <thead>
    <tr className="title">
      <th>Hình ảnh</th>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th>Đơn giá</th>
      <th>Tổng</th>
    </tr>
  </thead>
  <tbody>
    <tr className="product">
      <td colSpan="1"><Link to="#"><img src="path_to_image_1" alt="lap1" /></Link></td>
      <td colSpan="1">Tên sản phẩm 1</td>
      <td colSpan="1">3</td>
      <td colSpan="1">100</td>
      <td colSpan="1">300</td>
    </tr>
    <tr className="product">
      <td colSpan="1"><Link to="productDetail.html"><img src="path_to_image_2" alt="lap1" /></Link></td>
      <td colSpan="1">Tên sản phẩm 2</td>
      <td colSpan="1">2</td>
      <td colSpan="1">150</td>
      <td colSpan="1">300</td>
    </tr>
    <tr className="product">
      <td colSpan="1"><Link to="#"><img src="path_to_image_3" alt="lap2" /></Link></td>
      <td colSpan="1">Tên sản phẩm 3</td>
      <td colSpan="1">1</td>
      <td colSpan="1">200</td>
      <td colSpan="1">200</td>
    </tr>
  </tbody>
</table> */}

<table>
  <thead>
<tr>
  <th>Hình ảnh</th>
  <th>Tên sản phẩm</th>
  <th>Số lượng</th>
  <th>Đơn giá</th>
  <th>Tổng</th>
  <th>Ngày giao</th>
</tr>
  </thead>
  <tbody>
<tr>
  <td>
    <image src={PICTURE.GeForce_RTX4060} alt="laptop_1"/>
  </td>
  <td>
    laptop
  </td>
  <td>
    5
  </td>
  <td>

  </td>
</tr>
  </tbody>
</table>

            <div id="main_infor">
              <h1>Chi tiết đơn hàng</h1>
              <hr />
              <form action="#">
                <div className="info">
                  <label htmlFor="product_brand">Họ tên</label>
                  <input type="text" value="" disabled />
                </div>
                <div className="info">
                  <label htmlFor="product_price">Điện thoại</label>
                  <input type="text" value="" disabled />
                </div>
                <div className="info">
                  <label htmlFor="product_ram">Địa chỉ</label>
                  <input type="text" value="" disabled />
                </div>
                <div className="option">
                  <label htmlFor="product_quantity">Trạng thái</label>
                  <label htmlFor="option1">Chưa xử lý</label>
                  <input type="radio" id="option" name="option" value="chuaXuLy" checked />
                  <label htmlFor="option2">Đã xử lý</label>
                  <input type="radio" id="option" name="option" value="daXuLy" />
                </div>
                <div className="buttons">
                  <Link to="orderAdmin.html"><i className="fa-solid fa-x"></i>Đóng</Link>
                  <Link onClick={handleWarning}><i className="fa-solid fa-download"></i>Lưu</Link>
                </div>
              </form>
            </div>
          </section>
        </main>
      </body>
    </div>
  );
};

export default OrderDetail;
