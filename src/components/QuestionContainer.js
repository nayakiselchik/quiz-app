import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import he from 'he';

//Була проблема з однаковими варіантами, пофіксила
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const QuestionContainer = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [quizEnded, setQuizEnded] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(
                'https://opentdb.com/api.php?amount=10&category=12'
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const decodedQuestions = data.results.map((question) => {
                const shuffledAnswers = shuffleArray([
                    ...question.incorrect_answers.map(answer => he.decode(answer)),
                    he.decode(question.correct_answer)
                ]);
                return {
                    ...question,
                    question: he.decode(question.question),
                    correct_answer: he.decode(question.correct_answer),
                    shuffled_answers: shuffledAnswers
                };
            });
            setQuestions(decodedQuestions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAnswerSubmit = () => {
        const correctAnswer = questions[currentQuestion].correct_answer;
        if (selectedAnswer === correctAnswer) {
            setIsCorrect(true);
            setCorrectAnswersCount(correctAnswersCount + 1);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer('');
            setIsCorrect(null);
        } else {
            setQuizEnded(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer('');
        setIsCorrect(null);
        setQuizEnded(false);
        setCorrectAnswersCount(0);
    };

    const handleShowResults = () => {
        alert(`You answered ${correctAnswersCount} out of ${questions.length} questions correctly.`);
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestionData = questions[currentQuestion];
    const { question, shuffled_answers } = currentQuestionData;

    return (
        <Card bg="light" text="dark" className="p-4  mt-3 rounded" style={{maxWidth: '400px', margin: 'auto'}}>
            <Card.Body>
                {quizEnded ? (
                    <div>
                        <Card.Title>Quiz Ended</Card.Title>
                        <Card.Text>
                            You have completed the quiz! Click below to see your results.
                        </Card.Text>
                        <Button variant="success" onClick={handleShowResults}>Show Results</Button>
                        <Button variant="warning" onClick={handleRestartQuiz} className="ml-2">Restart Quiz</Button>
                    </div>
                ) : (
                    <div>
                        <Card.Title>Quiz Question</Card.Title>
                        <Card.Text>{question}</Card.Text>
                        <Form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(); }}>
                            {shuffled_answers.map((answer, index) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    id={`answer-${index}`}
                                    label={answer}
                                    name="answer"
                                    checked={selectedAnswer === answer}
                                    onChange={() => setSelectedAnswer(answer)}
                                    className="mb-2"
                                />
                            ))}
                            <Button type="submit" variant="primary">Submit Answer</Button>
                        </Form>
                        {isCorrect !== null && (
                            <div className="mt-2">
                                {isCorrect ? (
                                    <p className="text-success">Correct!</p>
                                ) : (
                                    <p className="text-danger">Incorrect!</p>
                                )}
                                {currentQuestion === questions.length - 1 ? (
                                    <Button onClick={handleNextQuestion} variant="info">Finish Quiz</Button>
                                ) : (
                                    <Button onClick={handleNextQuestion} variant="secondary">Next Question</Button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default QuestionContainer;
