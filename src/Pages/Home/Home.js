import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import Footer from '../../Components/Footer/Footer';
import Highlight from '../../Components/Highlight/Highlight';
import Facility from '../../Components/KeySupport/Facility';

const Home = () => {
  const styles = {
    highlightTitle: {
      textAlign: 'center',
      margin: '20px 0',
      marginTop:'4%',
      fontSize: '2em',
      color: '#333',
    },keySupports: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '35px',
        color: '#333',

      }
  };

  return (
    <div>
      <Navbar />
      <Banner />
      <h1 style={styles.highlightTitle}>Product Highlights</h1>
      <Highlight />
      <div style={styles.keySupports}>
        <p>Our Key Supports</p>
      </div>
      <Facility />
      <Footer />
    </div>
  );
};

export default Home;
