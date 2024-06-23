const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Array of music facts
const musicFacts = [
    "The world's longest running performance will end in the year 2640.",
    "The most expensive musical instrument ever sold is a Stradivarius violin for $15.9 million.",
    "Mozart wrote his first composition at the age of five.",
    "The Beatles hold the record for the most number-one hits on the Billboard Hot 100 chart.",
    "Beethoven continued to compose music even after he became completely deaf.",
    "The first CD ever pressed in the United States was Bruce Springsteen's 'Born in the USA.'",
    "Jingle Bells was originally written as a Thanksgiving song.",
    "The most expensive sheet music ever sold was for Beethoven's Ninth Symphony, which went for $3.4 million.",
    "The world record for the longest concert by a solo artist is held by Chilly Gonzales, who played for 27 hours, 3 minutes and 44 seconds.",
    "The oldest known musical instrument is a flute made from a vulture's wing bone, dating back over 40,000 years.",
    "Michael Jackson’s Thriller is the best-selling album of all time.",
    "The term 'rock and roll' was originally a nautical term that referred to the motion of a ship on the ocean.",
    "Freddie Mercury once recorded a duet with Michael Jackson, but it was never released because Mercury brought a llama into the studio.",
    "The shortest song ever recorded is 'You Suffer' by Napalm Death, lasting only 1.316 seconds.",
    "Elvis Presley never performed outside of North America."
];

// Endpoint to get a random music fact
app.get('/music-fact', (req, res) => {
    const randomIndex = Math.floor(Math.random() * musicFacts.length);
    const fact = musicFacts[randomIndex];
    res.json({ fact });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
