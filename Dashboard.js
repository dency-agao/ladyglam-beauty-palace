import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS
import "./../styles/dashboard.css";
import TopNavbar from "./Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <TopNavbar onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="container mt-4">
        {/* Carousel Section */}2
        
<div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="2000">
      <img src="/images/image1.jpg" className="d-block w-100" alt="Beauty Service 1" />
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="/images/image2.jpg" className="d-block w-100" alt="Beauty Service 2" />
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="/images/image3.jpg" className="d-block w-100" alt="Beauty Service 3" />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
  </button>
</div>

        {/* CEO Section */}
        <div className="row my-5">
          <div className="col-md-6 text-center">
            <img src="/images/ceo.jpg" className="img-fluid rounded shadow" alt="CEO" />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="ceo-content">
              <h3><b>Welcome to DencyGlam Beauty Palace</b></h3>
              <p className="lead">
                DencyGlam Beauty Palace is dedicated to bringing out your inner beauty.
                 We offer top-tier services with professional stylists ready to transform your look.
                 Our diversity in services make us your number one choice when it comes to the art of beauty enhancement.
                 Distance is never a barrier order your products and book your appointment now!
              </p>
              <p>
                <i>DencyGlam Beauty Palace.Brings Out Your Inner Beauty!</i>
              </p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="row my-5">
          <div className="col-12 text-center">
            <h3>Our Services</h3>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="service-card">
                  <h4>Hair Styling</h4>
                  <p>Professional hair cuts, coloring, and treatments</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-card">
                  <h4>Facial Treatment</h4>
                  <p>Rejuvenating facials and skin care</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-card">
                  <h4>Nail Care</h4>
                  <p>Manicure, pedicure, and nail art</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section text-center bg-light p-4 rounded shadow-sm">
          <h4>Contact Us</h4>
          <div className="row mt-4">
            <div className="col-md-6">
              <p><strong>Email:</strong> contact@dencyglam.com</p>
              <p><strong>WhatsApp:</strong> +254700000000</p>
              <p><strong>Facebook:</strong> DencyGlam Official</p>
            </div>
            <div className="col-md-6">
              <p><strong>Phone 1:</strong> 0706160639</p>
              <p><strong>Phone 2:</strong> 0112031528</p>
              <p><strong>Location:</strong> Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-4">
          <div className="container">
            <h5>Thank You for Choosing DencyGlam</h5>
            <p>Bringing Out Your Inner Beauty Since 2024</p>
            <div className="footer-social mt-3">
              <a href="#" className="mx-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="mx-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="mx-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="mx-2">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
