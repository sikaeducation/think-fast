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

// Non-deterministic
import { generateQuestion } from "./question-generation";
app.post('/get-next-question', (request: Request, response: Response) => {
  response.json({
    question: generateQuestion(),
  });
});

module.exports = app;
