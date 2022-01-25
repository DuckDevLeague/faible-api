import { Router } from 'express';
import { getStoryById, getHome, searchStories } from './routes/stories';

const router = Router();

router.get('/story/:id', getStoryById);
router.get('/search/:param', searchStories);
router.get('/home', getHome);

export { router }