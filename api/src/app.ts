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

const { generateQuestion } = require("./question-generation");
const cases = ["kebab", "camel", "pascal", "snake"];
const contexts = ["file", "component", "variable"];
const words = [
  ["the", "app"],
  ["index", "view"],
]

// Non-deterministic
app.post('/get-next-question', (request: Request, response: Response) => {
  response.json({
    question: generateQuestion({
      words: sample(words),
      context: sample(contexts),
      stringCase: sample(cases),
    }),
  });
});

module.exports = app;
