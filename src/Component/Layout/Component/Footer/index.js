import { FaFacebook } from "react-icons/fa";
import { FaPhoneVolume, FaXTwitter } from "react-icons/fa6";
import { MdOutlineSchedule } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import "../Footer/Footer.scss";
function Footer(){
    return(
    <div className="wrapper">
 <div id="foot">
 <div class="container_footer">
            <div class="topfoot">
                <div class="footmenu">
                    <h4>LIÊN HỆ</h4>
             
                    <p>Email:<Link to="">       <span><TfiEmail size={20} style={{paddingRight:5}}></TfiEmail></span>phucly069@gmail.com</Link>
                        <Link to=""><TfiEmail size={20} style={{paddingRight:5}}></TfiEmail>lenguyenquochunghello@gmail.com </Link>
                        <Link to=""><TfiEmail size={20} style={{paddingRight:5}}></TfiEmail>nguyenbang.2301@gmail.com</Link>
                    </p>
                    <p>Hotline:<Link to=""><span><FaPhoneVolume /></span> 1900 633 028</Link>
                    </p>
                    <p>Mon-Sun<Link to=""><span><MdOutlineSchedule /></span> 09:30 - 21:30</Link>
                    </p>
                </div>
                <div class="footmenu">
                    <h4>CỬA HÀNG</h4>
                    <p>273 An Dương Vương,TPHCM <br></br></p>
                    <p>123 Alexander, Toronto, Canada <br></br></p>
                    <p>842 Donald, California, America <br></br></p>
                </div>
                <div class="footmenu">
                    <h4>HỖ TRỢ</h4>
                    <Link to="/Policy">Chính sách đổi trả & bảo hành</Link>
                </div>
                <div class="footmenu">
                    <h4>MỞ RỘNG</h4>
                    <Link to="https://www.facebook.com/"><TfiEmail size={25}></TfiEmail></Link>
                    <Link to="https://www.instagram.com/"><FaFacebook size={25}/></Link>
                    <Link to="https://twitter.com/?lang=vi"><FaXTwitter size={25}/></Link>
                </div>
                
            </div>
            <div class="botfoot" >
                <p>2022 &#169; Copyright NVIDIA. All Rights Reserved.</p>
            </div>
        </div>
 </div>
    </div>
    )
}
export default Footer;