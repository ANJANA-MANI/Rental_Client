import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css'; // Import your CSS file for carousel styling

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://wallpaperswide.com/download/maldive_islands_resort-wallpaper-1680x1050.jpg",
      caption: "Find Your Stay, Anywhere, Anytime: Welcome Home ..."
    },
    {
      image: "https://a0.muscache.com/im/pictures/7fde1672-2160-4593-90cd-00bd75da732a.jpg?im_w=960",
      caption: "Stay, Share, Connect: Your Home, Your Host, Your Choice with Rental Nest"
    },
    {
      image: "https://a0.muscache.com/im/pictures/miso/Hosting-731672872585103658/original/e28db6a3-6932-4c82-809e-546ef1d9f5a9.jpeg?im_w=1200",
      caption: "Explore, Host, Unite: Where Every Stay Tells a Story"
    }
  ]; 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="carousel">
      <button className="arrow left" onClick={handlePrev}>&#10094;</button>
      <div className="slide-container">
        <img className="slide" src={slides[currentSlide].image} alt={`Slide ${currentSlide}`} />
        <div className="caption">{slides[currentSlide].caption}</div>
      </div>
      <button className="arrow right" onClick={handleNext}>&#10095;</button>
    </div>
  );
}

export default Banner;
