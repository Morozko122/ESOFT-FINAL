import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ContentSection.css';
import ContentCard from '../components/ContentCard';
import NavigateContentCard from './NavigateCard';

const ContentCarousel = ({ title, url, sortBy, order }) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${url}?page=${page}&sortBy=${sortBy}`);
        if (Array.isArray(response.data.rows)) {
          setContent(prevContent => [...prevContent, ...response.data.rows]);
          setHasMore(response.data.rows.length > 0);
        } else {
          throw new Error('Unexpected response data format');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Error fetching content');
        setLoading(false);
      }
    };

    fetchContent();
  }, [url, page]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: false, 
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          draggable: false,
          slidesToShow: content.length < 3? content.length : 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          draggable: false,
          slidesToShow: content.length < 2? content.length : 2,
          infinite: false,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          draggable: false,
          slidesToShow: content.length < 1? content.length : 1,
          infinite: false,
          slidesToScroll: 1
        }
      }
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  if (loading && page === 1) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="content-carousel">
      <h2>{title}</h2>
      <Slider {...settings}>
        {content.map(item => (
          <ContentCard key={item.content_id} content={item} />
        ))} 
        <NavigateContentCard sortBy={sortBy} order={order}></NavigateContentCard>
      </Slider>
    </div>
  );
};

export default ContentCarousel;