import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlane, faCoffee, faDesktop, faEdit } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';



function ContactPage () {
    return (
        <section className="vh-100 back-contact">
            <div className=" py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0 form-body">
                        <div className="card mb-3 ">
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white">                                    
                                    <img src="https://kenh14cdn.com/thumb_w/660/2020/7/17/brvn-15950048783381206275371.jpg" alt="Avatar" className="img-fluid img-user" />
                                    <h5>Mr. Van Duy</h5>
                                    <p>26/10/2003</p>
                                    <i>
                                        <FontAwesomeIcon icon={faEdit}/>
                                    </i>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4 back-body">
                                        <h6 className="heading">Thông tin cá nhân</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className=" desc">Duy986@gmail.com</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Điện thoại</h6>
                                                <p className=" desc">1234567890</p>
                                            </div>
                                        </div>
                                        
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Địa chỉ</h6>
                                                <p className=" desc">Nam Từ Liêm - Hà Nội</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Xem nhiều nhất</h6>
                                                <p className=" desc" >mostViewedProject</p>
                                            </div>
                                        </div>
                                        <h6 className="heading">Mô Tả</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="">                                                
                                                <p className=" desc">Học lập trình một mình sao bằng có bạn bè cùng tiến? Đừng để bản thân phải lạc lõng, hãy ghé qua Discord của F8 và cảm nhận sự khác biệt nhé!</p>
                                            </div>                                            
                                        </div>
                                        <div className="d-flex">
                                            <a  href="#!" className="icon-user">
                                                <FontAwesomeIcon icon={faPlane}/>
                                            </a>
                                            <a href="#!" className="icon-user">
                                                <FontAwesomeIcon icon={faCoffee}/>
                                            </a>
                                            <a href="#!" className="icon-user">
                                                <FontAwesomeIcon icon={faDesktop} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactPage;

