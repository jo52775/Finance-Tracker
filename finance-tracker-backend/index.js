import express from 'express';
import cors from 'cors';
import categoryRouter from './routes/categoryRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRouter);
app.use('/api/transactions', transactionRouter);

app.listen(port, () => {
  console.log(`Finance Tracker Server is listening on port ${port}.`);
});
