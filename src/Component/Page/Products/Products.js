import React, { useState } from "react";
import { BsSlashLg } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import PICTURE from "../../Assests/PICTURE";
import "../Products/Products.scss";
function Products() {
  
  const [laptopOff, setLaptopOff] = useState(false);

  const toggleLaptop = () => {
    setLaptopOff(!laptopOff);
  };

  return (
   
      <div className="inner">
        <div className="grid wide">
        <div className="products">
          <div className="row">
            <div className="col l-12">
              <div className="breadcrumb-list">
                <ol>
                  <li>
                 
                  <Link to="/">
        < FaHome  style={{color:"blue",paddingRight:4}} size={20} ></ FaHome>
        <span>Home Page           <span><BsSlashLg style={{marginLeft:0,marginRight:0}}></BsSlashLg></span>
              
                    <span style={{color:"black"}}> ASUS PROART GeForce RTX 4090 24GB (PROART-RTX4090-24G)
                    </span></span>

                   
                    </Link>

                   
            
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="products-content">
              <div className="col l-4">
                <img src={PICTURE.laptop} className="products-picture"></img>
              </div>
              <div className="col l-8">
                <div className="products-title-heading">
                <h2>Màn hình Viewsonic VA2432-H-W 24" IPS 100Hz viền mỏng</h2>
                </div>
                <div className="products-price">
                  <span className="products-price-new">2.550.000₫</span>
                  <span className="products-price-old">2.990.000₫</span>
                  <span className="products-discount">-15%</span>
                </div>

                <div className="action-buys">
                  <button className="button btn-buynow" onClick={toggleLaptop}>
           
                    <span className="maintext">BUY NOW</span>
                    <span className="subtext">
                      Delivery to your door or pick up from the store
                    </span>
                  
                  </button>

                </div>



                <div className="products-desc-short">
                  <p className="products-desc">
                    <strong>
                      <span style={{ fontSize: 20, marginBottom: 10 }}>
                        General infomation:
                      </span>
                    </strong>
                  </p>
                  <p className="products-desc">
                    <strong>
                      <span style={{ fontSize: 20, marginBottom: 10 }}>
                        - Support change new in 7 days
                      </span>
                    </strong>
                  </p>
                  <p className="products-desc">
                    <strong>
                      <span style={{ fontSize: 20, marginBottom: 10 }}>
                        - Discont $10 buying with PC/Laptop
                      </span>
                    </strong>
                  </p>
                </div>

                <div className="products-discount-promo-box">
                  <div className="products-box-header">
                    <h2>Discount</h2>
                  </div>
                  <div className="products-box-content">
                    <div className="products-discount-promo--content">
                      <div className="products-discount-promo--list">
                        <ul>
                          <li>
                            <div className="line-discount">
                              <span>
                                Discount $10 buying with PC
                                GVN x ASUS EVANGELION 2
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="line-discount">
                              <span>
                                Discount $10 buying with PC
                                GVN Gaming Intel i7-13700F/ VGA RTX 4070.{" "}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="line-discount">
                              <span>
                              Discount $10 buying with PC
                                GVN Gaming Intel i5-13600KF/ VGA RTX 3060.{" "}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="line-discount">
                              <span>
                              Discount $10 buying with North screen
                                Bayou NB-F80 với màn hình giá chỉ 290.000đ.{" "}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              </div>
              <div className="row">
                <div className="products-desc-content">
              <div className="col l-7 products-desc">
                <div className="products-heading">
                  <h2>Mô tả sản phẩm</h2>
                </div>
                <div className="products-wrap">
                  <div className="products-desc--content expand--toggle ">
                    <div
                      className="desc-content"
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <span style={{ fontSize: 22 }}>
                        <strong style={{ color: "black" }}>
                          Technology specifications
                        </strong>
                      </span>
                    </div>
                    <div className="scroll-panel">
                      <table className="table table-bordered">
                        <tbody>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Trademark</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>Viewsonic</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Warranty</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}> 36 months</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Color</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>White</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Size</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>38 inches</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Resolution</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>
                                {" "}
                                1920 x 1080 (FullHD) 16:9
                              </span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Panel Type</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}> IPS</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Refresh Rate:</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}> 100Hz</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Response Time</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>1ms</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Screen Type</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>Flat</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Color Support</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>
                                {" "}
                                16.7 million colors, NTSC: 75% size (Typ), sRGB:
                                105% size / 99% coverage (Typ)
                              </span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Static Contrast Ratio</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>
                                {" "}
                                1,300:1 (typ)
                              </span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Dynamic Contrast Ratio</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>
                                {" "}
                                178° (H) / 178° (V)
                              </span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Viewing Angles</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>50M:1</span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Brightness</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <span style={{ fontSize: 18 }}>
                                250 cd/m2 (typ)
                              </span>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Ports</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <ul>
                                <li>
                                  <span style={{ fontSize: 18 }}>VGA:1</span>
                                </li>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    3.5mm Audio Out: 1{" "}
                                  </span>
                                </li>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    HDMI 1.4: 1{" "}
                                  </span>
                                </li>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    Power Input: DC Socket (Center Positive){" "}
                                  </span>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Weight</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <ul>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    Net Weight (kg): 2.7
                                  </span>
                                </li>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    Net Weight without Stand (kg): 2.4{" "}
                                  </span>
                                </li>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    Gross Weight (kg): 3.7{" "}
                                  </span>
                                </li>
                              </ul>
                            </td>
                          </tr>
                          <tr style={{ boxSizing: "border-box" }}>
                            <td className="col-info">
                              <span style={{ fontSize: 18 }}>
                                <strong>
                                  <strong>Standard Dimensions</strong>
                                </strong>
                              </span>
                            </td>
                            <td className="col-info-long">
                              <ul>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    Packaging (mm): 600 x 395 x 112
                                  </span>
                                </li>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    With Stand (mm): 540 x 406 x 185{" "}
                                  </span>
                                </li>
                                <li>
                                  <span style={{ fontSize: 18 }}>
                                    Without Stand (mm): 540 x 322 x 36
                                  </span>
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col l-5">
                <div className="products-block">
                  <div className="products-heading">
                    <h2>News about products</h2>
                  </div>
                  <div className="products-wrap">
                    <ul className="list-post">
                      <li className="item-post fade-box">
                        <div className="img-post">
                          <Link
                            className="aspect-ratio"
                            to="https://gvn360.com/cong-nghe/galax-rtx-4090-la-gpu-dau-tien-co-hdmi-retimer-de-truyen-du-lieu-duong-dai/"
                            
                          >
                            <img
                              src={PICTURE.cardnew}
                              alt="Galax RTX 4090 là GPU đầu tiên có HDMI Retimer để truyền dữ liệu đường dài"
                            ></img>
                          </Link>
                        </div>
                        <div className="info-post">
                          <h3>
                          <Link to="https://gvn360.com/cong-nghe/galax-rtx-4090-la-gpu-dau-tien-co-hdmi-retimer-de-truyen-du-lieu-duong-dai/">Galax RTX 4090 là GPU đầu tiên có HDMI Retimer để truyền dữ liệu đường dài</Link>
                          </h3>
                        </div>
                      </li>
                      <li className="item-post fade-box">
                        <div className="img-post">
                          <Link
                            className="aspect-ratio"
                            to="https://gearvn.com/blogs/cong-nghe/cpu-z-khong-con-la-cong-cu-benchmark-cpu-ly-tuong-nua"
                          >
                            <img
                              src={PICTURE.cpu}
                              alt="CPU-Z không còn là công cụ benchmark CPU lý tưởng nữa"
                            ></img>
                          </Link>
                        </div>
                        <div className="info-post">
                          <h3>
                          <Link to="https://www.bing.com/search?pglt=41&q=CPU-Z+kh%C3%B4ng+c%C3%B2n+l%C3%A0+c%C3%B4ng+c%E1%BB%A5+benchmark+CPU+l%C3%BD+t%C6%B0%E1%BB%9Fng+n%E1%BB%AFa&cvid=93dbdc53dcf0417ab0bbc272dd8a0ab0&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg80gEIMTAxMmowajGoAgCwAgA&FORM=ANAB01&PC=CNNDDB">CPU-Z không còn là công cụ benchmark CPU lý tưởng nữa</Link>
                          </h3>
                        </div>
                      </li>
                      <li className="item-post fade-box">
                        <div className="img-post">
                          <Link
                            className="aspect-ratio"
                            to="https://gearvn.com/blogs/cong-nghe/elon-musk-ra-mat-chatbot-ai-grok-biet-tau-hai-y-nhu-chu-cua-no"
                          >
                            <img
                              src={PICTURE.ai}
                              alt="Elon Musk ra mắt chatbot AI Grok biết tấu hài y như chủ của nó"
                            ></img>
                          </Link>
                        </div>
                        <div className="info-post">
                          <h3>
                          <Link to="https://gearvn.com/blogs/cong-nghe/elon-musk-ra-mat-chatbot-ai-grok-biet-tau-hai-y-nhu-chu-cua-no">Elon Musk ra mắt chatbot AI Grok biết tấu hài y như chủ của nó</Link>
                          </h3>
                        </div>
                      </li>
                      <li className="item-post fade-box">
                        <div className="img-post">
                          <Link
                            className="aspect-ratio"
                            to="https://gvn360.com/cong-nghe/galax-rtx-4090-la-gpu-dau-tien-co-hdmi-retimer-de-truyen-du-lieu-duong-dai/"
                          >
                            <img
                              src={PICTURE.flag}
                              alt="
                              Việt Nam đặt mục tiêu trở thành quốc gia sản xuất bóng bán dẫn"
                            ></img>
                          </Link>
                        </div>
                        <div className="info-post">
                          <h3>
                          <Link to="https://gearvn.com/blogs/cong-nghe/viet-nam-dat-muc-tieu-tro-thanh-quoc-gia-san-xuat-bong-ban-dan">Galax RTX 4090 là GPU đầu tiên có HDMI Retimer để truyền dữ liệu đường dài</Link>
                          </h3>
                        </div>
                      </li>
                   
                    
                    </ul>
                  </div>
                </div>
              </div>
              </div>
          </div>
          </div>
        </div>
      </div>
 
  );
}

export default Products;
