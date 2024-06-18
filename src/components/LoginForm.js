import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import he from 'he';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
    const [usernameError, setUsernameError] = useState('');
    const handleUsernameChange = (value) => {
        //Захист від XSS
        const sanitizedUsername = he.encode(value);
        setUsername(sanitizedUsername);

        //Валідація для інпуту
        const validCharacters = /^[a-zA-ZА-Яа-яЁёЄєЇїҐґІі0-9]*$/;
        if (!validCharacters.test(value)) {
            setUsernameError('Username must contain only English letters and numbers.');
        } else {
            setUsernameError('');
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!usernameError && username && password) {
            handleLogin(e);
        } else {
            //Показування помилки, якщо поле залишилось пусте
            setUsernameError('Please enter a valid username and password.');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="p-4 mt-3 border rounded" style={{maxWidth: '400px', margin: 'auto'}}>
            <h2 className="mb-4 text-center">Login</h2>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    required
                    isInvalid={!!usernameError}
                />
                <Form.Control.Feedback type="invalid">
                    {usernameError}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">Login</Button>
        </Form>
    );
};

export default LoginForm;