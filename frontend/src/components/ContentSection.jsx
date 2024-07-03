// // import React, { useEffect, useState } from 'react';
// // import { Box, Typography, CircularProgress } from '@mui/material';
// // import axios from 'axios';
// // import ContentCard from './ContentCard';

// // const ContentSection = ({ title, url }) => {
// //   const [contentList, setContentList] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchContent = async () => {
// //       try {
// //         const response = await axios.get(url);
// //         setContentList(response.data);
// //       } catch (error) {
// //         console.error('Error fetching content:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchContent();
// //   }, [url]);

// //   return (
// //     <Box sx={{ marginTop: 4 }}>
// //       <Typography variant="h5">{title}</Typography>
// //       {loading ? (
// //         <CircularProgress />
// //       ) : (
// //         <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
// //           {contentList.map((content) => (
// //             <ContentCard key={content.content_id} content={content} />
// //           ))}
// //         </Box>
// //       )}
// //     </Box>
// //   );
// // };

// // export default ContentSection;
// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import axios from 'axios';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import './ContentSection.css';

// const ContentCarousel = ({ title, url }) => {
//   const [content, setContent] = useState([]);

//   useEffect(() => {
//     axios.get(url)
//       .then(response => setContent(response.data))
//       .catch(error => console.error('Error fetching content:', error));
//   }, [url]);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//   };

//   return (
//     <div className="content-carousel">
//       <h2>{title}</h2>
//       <Slider {...settings}>
//         {content.map(item => (
//           <div key={item.content_id} className="carousel-item">
//             <div className="content-square">
//               <div className="content-overlay">
//                 <p>{item.description}</p>
//                 <p>Tags: {item.tags}</p>
//                 <p>Type: {item.type_id}</p>
//                 <p>Rating: {item.rating}</p>
//               </div>
//               <div className="content-label">{item.label}</div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ContentCarousel;
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ContentSection.css';

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
        setContent(prevContent => [...prevContent, ...response.data]);
        setHasMore(response.data.length > 0);
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
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="content-carousel">
      <h2>{title}</h2>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Slider {...settings}>
        {content.map(item => (
          <div key={item.content_id} className="carousel-item">
            <div className="content-square">
              <div className="content-overlay">
                <p>{item.description}</p>
                <p>Tags: {item.tags}</p>
                <p>Type: {item.type_id}</p>
                <p>Rating: {item.rating}</p>
              </div>
              <div className="content-label">{item.label}</div>
            </div>
          </div>
        ))}
      </Slider>
      {loading && <div>Loading more...</div>}
    </div>
  );
};

export default ContentCarousel;
