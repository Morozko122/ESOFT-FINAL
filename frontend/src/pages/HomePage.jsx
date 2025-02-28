import React from 'react';
import { Container } from '@mui/material';
import ContentSection from '../components/ContentSection';

const HomePage = () => {
  return (
    <Container>
      <ContentSection title="Недавно добавленные" url="http://localhost:3000/api/content/get/" sortBy="upload_date" order="DESC"/>
      <ContentSection title="Сейчас популярно" url="http://localhost:3000/api/content/get/" sortBy="favorite_count" order="DESC"/>
    </Container>
  );
};

export default HomePage;
