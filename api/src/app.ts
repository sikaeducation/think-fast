import express, { Request, Response } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { generateQuestion } from './question-generation';
import { evaluateAnswer } from './answer-evaluation';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Non-deterministic
app.post('/get-question', (request: Request, response: Response) => {
  response.json({
    question: generateQuestion(),
  });
});

app.post('/evaluate-answer', (request: Request, response: Response) => {
  const { stem, userResponse } = request.body.answer;
  response.json(evaluateAnswer(stem, userResponse));
});

export default app;
