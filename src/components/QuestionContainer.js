import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import he from 'he';

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
            const decodedQuestions = data.results.map((question) => ({
                ...question,
                question: he.decode(question.question),
                correct_answer: he.decode(question.correct_answer),
                incorrect_answers: question.incorrect_answers.map(answer => he.decode(answer)),
            }));
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
    const { question, incorrect_answers } = currentQuestionData;
    const answers = [...incorrect_answers, currentQuestionData.correct_answer];

    return (
        <Card>
            <Card.Body>
                {quizEnded ? (
                    <div>
                        <Card.Title>Quiz Ended</Card.Title>
                        <Card.Text>
                            You have completed the quiz! Click below to see your results.
                        </Card.Text>
                        <Button onClick={handleShowResults}>Show Results</Button>
                        <Button onClick={handleRestartQuiz} className="ml-2">Restart Quiz</Button>
                    </div>
                ) : (
                    <div>
                        <Card.Title>Quiz Question</Card.Title>
                        <Card.Text>{question}</Card.Text>
                        <Form onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(); }}>
                            {answers.map((answer, index) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    id={`answer-${index}`}
                                    label={answer}
                                    name="answer"
                                    checked={selectedAnswer === answer}
                                    onChange={() => setSelectedAnswer(answer)}
                                />
                            ))}
                            <Button type="submit">Submit Answer</Button>
                        </Form>
                        {isCorrect !== null && (
                            <div className="mt-2">
                                {isCorrect ? (
                                    <p className="text-success">Correct!</p>
                                ) : (
                                    <p className="text-danger">Incorrect!</p>
                                )}
                                {currentQuestion === questions.length - 1 ? (
                                    <Button onClick={handleNextQuestion}>Finish Quiz</Button>
                                ) : (
                                    <Button onClick={handleNextQuestion}>Next Question</Button>
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