import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import he from 'he';

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
    const [usernameError, setUsernameError] = useState('');

    const handleUsernameChange = (value) => {
        // Sanitize input using he library
        const sanitizedUsername = he.encode(value);
        setUsername(sanitizedUsername);
        // Basic validation for English characters
        if (!/^[a-zA-Z0-9]*$/.test(value)) {
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
            // Show error if fields are empty or username is invalid
            setUsernameError('Please enter a valid username and password.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
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
            <Button type="submit">Login</Button>
        </Form>
    );
};

export default LoginForm;
