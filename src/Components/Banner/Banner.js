import React, { useState } from 'react';

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const images = [
    {
      title: "Rent the Equipment You Need, When You Need It",
      description:
        "Skip the purchase, embrace the project! Our diverse equipment rentals offer the perfect solution for any task, big or small.",
      image: "https://images.pexels.com/photos/4506266/pexels-photo-4506266.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "John Doe",
    },
    {
      title: "Quality Equipment, Reliable Rentals",
      description:
        "Focus on the job, not the gear! We provide top-notch equipment rentals, meticulously maintained for your peace of mind.",
      image: "https://images.pexels.com/photos/5632379/pexels-photo-5632379.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "Jane Smith",
    },
    {
      title: "Competitive Rates, Flexible Rentals",
      description:
        "Get the equipment you need without breaking the bank. Choose from daily, weekly, or monthly rentals to fit your project timeline.",
      image: "https://images.pexels.com/photos/5650028/pexels-photo-5650028.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "Michael Lee",
    },
    {
      title: "Convenience at Your Fingertips",
      description:
        "Reserve your rental equipment online and pick it up at your nearest location. It's that simple! Get started on your project today.",
      image: "https://images.pexels.com/photos/5717944/pexels-photo-5717944.jpeg?auto=compress&cs=tinysrgb&w=600",
      user: "Sarah Jones",
    },
    {
      title: "Unlock Your Project Potential with Equipment Rentals",
      description:
        "Don't let lack of equipment hold you back! Explore endless possibilities with our diverse rental selection.",
      image: "https://www.cloudways.com/blog/wp-content/uploads/Ecommerce-Shopping-Infographics.png",
      user: "David Williams",
    },
  ];

  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const styles = {
    slider: {
      marginTop: '0%',
      position: 'relative',
      width: '100%',
      height: '600px',
      overflow: 'hidden',
    },
    slide: {
      display: 'none',
      position: 'absolute',
      width: '100%',
      height: '100%',
      transition: 'opacity 0.5s ease',
    },
    activeSlide: {
      display: 'block',
      opacity: 1,
    },
    sliderImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    slideContent: {
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      color: '#fff',
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '10px',
      borderRadius: '5px',
    },
    leftArrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      cursor: 'pointer',
      zIndex: 10,
      left: '10px',
    },
    rightArrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      cursor: 'pointer',
      zIndex: 10,
      right: '10px',
    },
  };

  return (
    <div style={styles.slider}>
      <button style={styles.leftArrow} onClick={prevSlide}>❮</button>
      {images.map((image, index) => (
        <div
          key={index}
          style={index === current ? { ...styles.slide, ...styles.activeSlide } : styles.slide}
        >
          {index === current && (
            <>
              <img src={image.image} alt="Slider" style={styles.sliderImage} />
              <div style={styles.slideContent}>
                <h2>{image.title}</h2>
                <p>{image.description}</p>
                <span>Posted by: {image.user}</span>
              </div>
            </>
          )}
        </div>
      ))}
      <button style={styles.rightArrow} onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Banner;
