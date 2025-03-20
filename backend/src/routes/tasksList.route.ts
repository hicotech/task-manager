import { Request, Response, Router } from 'express';
import { getRandomData } from '../utils/data.utils';

const router = Router();

router.get('/tasksList', (_request: Request, response: Response) => {
    response.send(getRandomData());
});

export default router;
