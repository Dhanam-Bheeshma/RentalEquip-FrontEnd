import React from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css'; 

const Facility = () => {
  const styles = {
    section: {
      padding: '50px 0',
      backgroundColor: 'brown',
    },
    facilityContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    facilityBox: {
      flex: '1 1 20%',
      textAlign: 'center',
      padding: '20px',
      transition: 'transform 0.3s ease',
    },
    facilityBoxHover: {
      transform: 'translateY(-10px)',
    },
    facilityIcon: {
      fontSize: '30px',
      marginBottom: '10px',
      color: 'white',
    },
    facilityText: {
      fontSize: '16px',
      color: 'white',
      margin: '0',
    },
    keySupports: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '18px',
      color: '#333',
    },
  };

  return (
    <section style={styles.section} id="facility">
      <div style={styles.facilityContainer} className="facility-container container">
        <div style={styles.facilityBox} className="facility-box">
          <div style={styles.facilityIcon}>
            <i className="fas fa-plane"></i>
          </div>
          <p style={styles.facilityText}>FREE SHIPPING WORLD WIDE</p>
        </div>
        <div style={styles.facilityBox} className="facility-box">
          <div style={styles.facilityIcon}>
            <i className="fas fa-credit-card"></i>
          </div>
          <p style={styles.facilityText}>100% MONEY BACK GUARANTEE</p>
        </div>
        <div style={styles.facilityBox} className="facility-box">
          <div style={styles.facilityIcon}>
            <i className="far fa-credit-card"></i>
          </div>
          <p style={styles.facilityText}>MANY PAYMENT GATEWAYS</p>
        </div>
        <div style={styles.facilityBox} className="facility-box">
          <div style={styles.facilityIcon}>
            <i className="fas fa-headphones-alt"></i>
          </div>
          <p style={styles.facilityText}>24/7 CUSTOMER SUPPORT</p>
        </div>
      </div>
    </section>
  );
};

export default Facility;
