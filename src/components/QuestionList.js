import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const QuestionList = ({ data, setSelectedItem }) => {
    return (
        <Row>
            {data.map((item, index) => (
                <Col key={index} md={4}>
                    <h2>{item.question}</h2>
                    <Button onClick={() => setSelectedItem(item)}>Learn More</Button>
                </Col>
            ))}
        </Row>
    );
};

export default QuestionList;
