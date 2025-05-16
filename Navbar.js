import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./../styles/navbar.css";
import { Link } from "react-router-dom";


const TopNavbar = ({ onLogout }) => {
  const [profilePicture, setProfilePicture] = useState("/default-profile.png"); // Default image

  useEffect(() => {
    // Fetch user profile picture from backend
    fetch("http://localhost:5000/profile/get-picture?userId=1")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile_picture) {
          setProfilePicture(`http://localhost:5000${data.profile_picture}`);
        }
      })
      .catch((err) => console.error("Error fetching profile picture:", err));
  }, []);

  return (
    <Navbar expand="lg" className="shadow-sm">
      <Container fluid>
        {/* Left Side: Logo & Title */}
        <Navbar.Brand className="d-flex align-items-center">
          <img
            src="/logo.jpg"
            alt="DencyGlam Logo"
            className="d-inline-block"
          />
          <div className="d-flex flex-column">
            <span className="fw-bold">DencyGlam</span>
            <small className="text-muted">Beauty Palace</small>
          </div>
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
  {/* Center: Navigation Links */}
  <Nav className="mx-auto">
  <Nav.Link as={Link} to="/dashboard">Home</Nav.Link> {/* ✅ Fix Home Link to Dashboard */}
    <Nav.Link as={Link} to="/products">Products</Nav.Link> {/* ✅ Fix Products Link */}
    <Nav.Link as={Link} to="/services">Services</Nav.Link> {/* ✅ Add Services Route */}
    <Nav.Link as={Link} to="/settings">Settings</Nav.Link> {/* ✅ Add Settings Route */}
  </Nav>
</Navbar.Collapse>


          {/* Right Side: Profile Picture & User Dropdown */}
          <Nav className="ms-auto d-flex align-items-center">
            <img
                src={profilePicture}
                alt="Profile"
                 className="profile-picture me-2"
            />

            
              <NavDropdown title="My Profile" id="profile-dropdown">
              <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
              <NavDropdown.Item href="/profile/edit">Update Profile</NavDropdown.Item>
              <NavDropdown.Item href="/profile/change-password">Change Password</NavDropdown.Item>
             <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>

          </Nav>
      
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
