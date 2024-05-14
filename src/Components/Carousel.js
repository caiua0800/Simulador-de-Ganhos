import React from "react";
import Slider from "react-slick";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel(props) {
  const {titleCarousel } = props;

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    draggable: true, 
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true, // Ativa o modo de centralização
          centerPadding: "50px", // Adiciona um padding para centralizar o slide
          arrows: false // Remove as setas de navegação
        }
      }
    ]
  };

  return (
    <div className="carousel">
      <h1 className="title-carousel">{titleCarousel}</h1>
      <Slider {...settings}>

      </Slider>
    </div>
  );
}
