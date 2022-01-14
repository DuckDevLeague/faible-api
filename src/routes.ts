import { Router } from 'express';
import { getStoryById } from './routes/stories';

const router = Router();

router.get('/story/:id', getStoryById);

export { router }