import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import AuthModal from './AuthModal';

const NavigateContentCard = ({ sortBy, order }) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const { token } = useSelector((state) => state.auth);

    const handleCardClick = () => {
        if (!token) {
            setOpenModal(true);
        } else {
            navigate(`/content?sortBy=${sortBy}&order=${order}`);
        }
    };

    return (
        <>
            <Card
                onClick={handleCardClick}
                sx={{
                    width: 200,
                    height: 200,
                    margin: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1976d2',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer'
                }}
            >
                <Typography variant="h6" align="center" color={'white'}>Посмотреть <br/>больше</Typography>
            </Card>
            <AuthModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
};

export default NavigateContentCard;
