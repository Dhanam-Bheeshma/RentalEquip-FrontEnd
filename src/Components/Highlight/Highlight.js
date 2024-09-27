import React from 'react';
import { useNavigate } from 'react-router-dom';

const Highlight = () => {
  const navigate = useNavigate();

  const handleImageClick = (link) => {
    if (link) {
      navigate(link);
    }
  };

  const products = [
    { index: 1, cardImg: 'https://cdn.shoplightspeed.com/shops/629152/files/15849116/1600x2048x1/standard-safety-helmet-ratchet-suspension-yellow-s.jpg', link: '/products/construction/concrete-mixer' },
    { index: 2, cardImg: 'https://www.kleintools.com/sites/default/files/product-assets/catalog-imagery/original/klein/ncvt1xt.jpg', link: '/products/electrical/transformer' },
    { index: 3, cardImg: 'https://m.media-amazon.com/images/I/51+zRxyZNtL._AC_SX679_.jpg', link: '/products/electronics/oscilloscope' },
    { index: 4, cardImg: 'https://m.media-amazon.com/images/I/518hsmGo2LL._SY445_SX342_QL70_FMwebp_.jpg', link: '/products/wood/wood-cutter' },
    { index: 5, cardImg: 'https://tolsen.com.ph/cdn/shop/products/fd.jpg?v=1570589857&width=990', link: '/products/construction/backhoe-loader' },
    { index: 6, cardImg: 'https://m.media-amazon.com/images/I/71t5X8FgRrL.__AC_SX300_SY300_QL70_FMwebp_.jpg' },
    { index: 7, cardImg: 'https://www.bosch-pt.co.in/in/en/ocsmedia/246835-54/application-image/1434x828/hand-held-circular-saw-gks-235-turbo-06015a20f0.png' },
    { index: 8, cardImg: 'https://www.rockler.com/media/catalog/product/7/9/79884-01-1000.jpg?optimize=medium&fit=bounds&height=&width=&canvas=:' },
    { index: 9, cardImg: 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/5/8/58782_W3.jpg' },
    { index: 10, cardImg: 'https://www.dlink.com.au/images/product_images/676/676_1000x1000_DIR-2150_1.png' },
    { index: 11, cardImg: 'https://www.mpja.com/images/35795.jpg' },
    { index: 12, cardImg: 'https://m.media-amazon.com/images/I/71J51wWfjqL._AC_SX679_.jpg' }
  ];

  const styles = {
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      padding: '20px',
      marginTop: '4%',
      marginLeft: '4%',
      marginRight: '4%',
    },
    gridItem: {
      position: 'relative',
      cursor: 'pointer',
      overflow: 'hidden',
      border: '1px solid #ccc',
      borderRadius: '8px',
      transition: 'transform 0.2s ease',
      height: '300px',
    },
    imgStyle: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'opacity 0.3s ease',
    },
  };

  return (
    <div style={styles.gridContainer}>
      {products.map((product, index) => (
        <div
          style={styles.gridItem}
          key={index}
          onClick={() => handleImageClick(product.link)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img
            src={product.cardImg}
            alt={product.name || `Highlight ${index + 1}`}
            style={styles.imgStyle}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          />
        </div>
      ))}
    </div>
  );
};

export default Highlight;
