import React from 'react';
import { Button } from 'react-bootstrap';

const QuestionDetail = ({ selectedItem, setSelectedItem }) => {
    return (
        <div>
            <h2>{selectedItem.question}</h2>
            <ul>
                {Object.entries(selectedItem.answers).map(([key, answer]) =>
                    answer && <li key={key}>{answer}</li>
                )}
            </ul>
            <Button onClick={() => setSelectedItem(null)}>Close</Button>
        </div>
    );
};

export default QuestionDetail;
