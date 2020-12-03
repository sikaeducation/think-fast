import express, { Request, Response } from 'express';

import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { generateQuestion } from './question-generation';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Non-deterministic
app.post('/get-next-question', (request: Request, response: Response) => {
  response.json({
    question: generateQuestion(),
  });
});

export default app;
