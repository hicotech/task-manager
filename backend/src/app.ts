import cors from 'cors';
import express from 'express';
import tasksListRouter from './routes/tasksList.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', tasksListRouter);

export default app;
