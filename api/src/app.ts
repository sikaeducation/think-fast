import { Request, Response } from 'express';

const express = require('express');

const app = express();
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const lodash = require('lodash/fp');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));

const { sample } = lodash;

const questions = [{
  id: 1,
  correctFeedback: "That's PascalCase, two words, and uses the App prefix.",
  incorrectFeedback: "That's PascalCase, two words, and uses the App prefix.",
  promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
  stemText: 'AppIndex.vue',
}, {
  id: 2,
  correctFeedback: "That's kebab-case, two words, and uses the App prefix.",
  incorrectFeedback: "That's kebab-case, two words, and uses the App prefix.",
  promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
  stemText: 'app-index.vue',
}];

// Non-deterministic
app.post('/get-next-question', (request: Request, response: Response) => {
  response.json({
    question: sample(questions),
  });
});

module.exports = app;
