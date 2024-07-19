import React, { useState, useEffect } from 'react';
import { Box, Grid, MenuItem, Select, CircularProgress, Typography } from '@mui/material';
import ContentCard from './ContentCard';
import axios from 'axios';

const ContentList = ({ url, initialSortBy, initialOrder }) => {
  const [contents, setContents] = useState([]);
  const [sortOrder, setSortOrder] = useState(initialSortBy);
  const [order, setOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchContents();
  }, [sortOrder, order, page]);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/content/get`, {
        params: { sortBy: sortOrder, order, page }
      });
      if (response.data.rows.length === 0) {
        setHasMore(false);
      } else {
        setContents(prev => [...prev, ...response.data.rows]);
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
    setLoading(false);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setContents([]);
    setPage(1);
    setHasMore(true);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setContents([]);
    setPage(1);
    setHasMore(true);
  };

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <Box sx={{ height: '100vh', padding: 2 }} onScroll={handleScroll}>
      <Typography variant="h4" marginBottom={'10px'}>Браузер мемов</Typography>
      <Box>
        <Select value={sortOrder} onChange={handleSortChange} sx={{ marginRight: 1, marginBottom: 1 }}>
          <MenuItem value="favorite_count">Популярность</MenuItem>
          <MenuItem value="upload_date">Дата загрузки</MenuItem>
          <MenuItem value="rating">Рейтинг</MenuItem>
        </Select>
        <Select value={order} onChange={handleOrderChange}>
          <MenuItem value="ASC">По возрастанию</MenuItem>
          <MenuItem value="DESC">По убыванию</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2}>
        {contents.map(content => (
          <Grid item key={content.content_id}>
            <ContentCard content={content} />
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
    </Box>
  );
};

export default ContentList;
