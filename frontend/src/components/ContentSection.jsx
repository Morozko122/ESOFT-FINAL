import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ContentSection.css';
import ContentCard from '../components/ContentCard';

const ContentCarousel = ({ title, url, sortBy }) => {
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
          setHasMore(response.data.length > 0);
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

  const loadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    afterChange: (currentSlide) => {
      if (currentSlide + 4 >= content.length) {
        loadMore();
      }
    },
  };

  if (loading && page === 1) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="content-carousel">
      <h2>{title}</h2>
      <Slider {...settings}>
        {content.map(item => (
          <ContentCard content={item} />
        ))}
      </Slider>
      {loading && <div>Loading more...</div>}
    </div>
  );
};

export default ContentCarousel;
