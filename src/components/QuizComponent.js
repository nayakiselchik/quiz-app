import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import QuizComponent from './QuizComponent';

const QuizContainer = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=10&category=12');
                console.log(response.data);
                if (Array.isArray(response.data.results)) {
                    setData(response.data.results);
                } else {
                    setError('Unexpected response format');
                }
            } catch (error) {
                console.error('There was an error fetching the data!', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000); // Fetch data every 60 seconds

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container>
            <QuizComponent data={data} />
        </Container>
    );
};

export default QuizContainer;
