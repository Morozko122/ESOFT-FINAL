import React from 'react';
import ContentList from '../components/ContentCardList';
import { Container, Box } from '@mui/material';

const ContentListPage = ({url}) => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 8 }}>
        <ContentList url = {url}/>
      </Box>
    </Container>
  );
};

export default ContentListPage;
