import React from 'react';
import ContentList from '../components/ContentCardList';
import { Container, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ContentListPage = ({url}) => {
  const query = useQuery();
  const sortBy = query.get('sortBy') || 'favorite_count';
  const order = query.get('order') || 'DESC';
  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 8 }}>
        <ContentList url = {url} initialSortBy = {sortBy} initialOrder = {order}/>
      </Box>
    </Container>
  );
};

export default ContentListPage;
