import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import TopNavbar from "../components/Navbar";

const servicesData = [
  {
    category: "Hair Braiding",
    styles: [
      { name: "Style 1", price: "1500", image: "style1.jpg" },
      { name: "Style 2", price: "300", image: "style2.jpg" },
      { name: "Style 3", price: "500", image: "style3.jpg" },
      { name: "Style 4", price: "350", image: "style4.jpg" },
      { name: "Style 5", price: "700", image: "style5.jpg" },
      { name: "Style 6", price: "1200", image: "style6.jpg" },
      { name: "Style 7", price: "800", image: "style7.jpg" },
      { name: "Style 8", price: "650", image: "style8.jpg" },
      
    ],
    
  },
  {
    category: "Dreadlocks Installation",
    styles: [
      { name: "Starter Locks", price: "4000", image: "dreads1.jpg" },
      { name: "Retwist & Styling", price: "4500", image: "dreads2.jpg" },
    ],
  },
  {
    category: "Natural Hair Styling",
    styles: [
      { name: "Blow dry", price: "100", image: "blowdry.jpg" },
      { name: "Gel and chemical", price: "250", image: "hair-gel.jpg" },
      { name: "Dye Application", price: "200", image: "dye.jpg" },
      { name: "Hair Trimming", price: "150", image: "hair-trimming.jpg" },
      { name: "Hair Relaxing", price: "350", image: "relaxing.jpg" },
    ],
  },

  {
    category: "Nail Dressing",
    styles: [
      { name: "Nail Polish Application", price: "100", image: "polish.jpg" },
      { name: "Gel Application", price: "250", image: "gel.jpg" },
      { name: "Acrylics Application", price: "200", image: "acrylics.jpg" },
      { name: "Tips & Gel", price: "150", image: "tips.jpg" },
      { name: "Tips & Acrylics", price: "350", image: "tips-acrylics.jpg" },
    ],
  },
  
    {
        category: "Make Up Application",
        styles: [
          { name: "Full Make up", price: "100", image: "full.jpg" },
          { name: "Casual Makeup", price: "250", image: "casual.jpg" },
          { name: "Classic Make up ", price: "200", image: "classy.jpg" },
          { name: "Natural look Makeup", price: "150", image: "natural.jpg" },
          
        ],
      }
  
];

const salonists = ["Mary", "Angela", "Sophia", "Grace"]; // Dummy data for now

const Services = () => {
  const [selectedSalonist, setSelectedSalonist] = useState(null);
  
  return (
    <>
      <TopNavbar /> {/* ✅ Navbar */}
      <Container className="services-container">
        <h2 className="text-center my-4">DencyGlam Beauty Services</h2>

        {servicesData.map((service, index) => (
          <div key={index} className="mb-5">
            <h3 className="service-category">{service.category}</h3>
            <Row>
              {service.styles.map((style, idx) => (
                <Col key={idx} md={4} className="mb-4">
                  <Card className="service-card">
                    <Card.Img
                      variant="top"
                      src={`/images/${style.image}`}
                      alt={style.name}
                      className="service-img"
                    />
                    <Card.Body>
                      <Card.Title>{style.name}</Card.Title>
                      <Card.Text className="price">Ksh {style.price}</Card.Text>
                      
                      {/* Salonist Selection */}
                      <Dropdown className="mb-2">
                        <Dropdown.Toggle variant="secondary">
                          {selectedSalonist ? selectedSalonist : "Select Salonist"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {salonists.map((salonist, i) => (
                            <Dropdown.Item key={i} onClick={() => setSelectedSalonist(salonist)}>
                              {salonist}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>

                      {/* Booking Button */}
                      <Button variant="primary" className="book-btn">
                        Book Now
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Services;
