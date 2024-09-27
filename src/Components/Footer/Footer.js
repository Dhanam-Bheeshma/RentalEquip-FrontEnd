import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px 0',
      textAlign: 'center',
    },
    footerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '1200px', // Optional: set a max-width
      margin: '0 auto', // Center the footer on the page
    },
    footerDetails: {
      margin: '10px',
      flex: '1',
      minWidth: '200px',
    },
    footerSocial: {
      textAlign: 'center',
      margin: '10px',
      flex: '1',
      minWidth: '200px',
    },
    socialIcons: {
      listStyle: 'none',
      padding: '0',
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
    },
    socialIconLink: {
      color: '#fff',
      fontSize: '1.5rem',
      transition: 'color 0.3s',
    },
    socialIconHover: {
      color: '#28C8B8',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        <div style={styles.footerDetails}>
          <h3>EquRent</h3>
          <p>Email: EquRent2024@gmail.com</p>
          <p>&copy; {new Date().getFullYear()} EquRent. All Rights Reserved.</p>
        </div>
        <div style={styles.footerSocial}>
          <h4>Follow Us</h4>
          <ul style={styles.socialIcons}>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIconLink}
                onMouseEnter={(e) => (e.target.style.color = styles.socialIconHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.socialIconLink.color)}
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIconLink}
                onMouseEnter={(e) => (e.target.style.color = styles.socialIconHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.socialIconLink.color)}
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </li>
            <li>
              <a
                href="mailto:ajayakash.offical.2608@gmail.com"
                style={styles.socialIconLink}
                onMouseEnter={(e) => (e.target.style.color = styles.socialIconHover.color)}
                onMouseLeave={(e) => (e.target.style.color = styles.socialIconLink.color)}
              >
                <i className="fas fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
