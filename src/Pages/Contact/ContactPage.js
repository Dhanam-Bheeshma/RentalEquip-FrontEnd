import { useState } from 'react';
import './ContactPage.css'; 
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';


const ContactPage = () => {
  const [contactInfo] = useState({
    address: '123 Main St, New York, NY 10001',
    email: 'info@example.com',
    phoneNumber: '(123) 456-7890',
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.807644399867!2d-74.0059413151576!3d40.71278427933129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1637022786848!5m2!1sen!2sus',
  });

  return (
    <div>
        <Navbar />
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-info">
        <div className="contact-box">
          <h2 className="contact-subtitle">Get in Touch</h2>
          <p className="contact-text">Address:</p>
          <p className="contact-text">{contactInfo.address}</p>
          <p className="contact-text">Email:</p>
          <p className="contact-text">{contactInfo.email}</p>
          <p className="contact-text">Phone Number:</p>
          <p className="contact-text">{contactInfo.phoneNumber}</p>
        </div>
        <div className="contact-box">
          <h2 className="contact-subtitle">Our Location</h2>
          <iframe
            src={contactInfo.mapLocation}
            className="map-frame"
            allowFullScreen
            title="Google Map Location"
          />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ContactPage;
