import { Router } from 'express';
import { getStoryById, getHome } from './routes/stories';

const router = Router();

router.get('/story/:id', getStoryById);
router.get('/home', getHome);

export { router }