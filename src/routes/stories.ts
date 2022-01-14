import { Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import app from '../services/firebaseService';

const db = getFirestore(app);

export const getStoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const storiesRef = db.collection('stories');
  const story = await storiesRef.doc(id).get();

  if (story.exists) {
    const dataResponse = {
      ...story.data(),
      id: id
    };
    return res.status(200).json(dataResponse);
  } 

  return res.status(404).json({});
}