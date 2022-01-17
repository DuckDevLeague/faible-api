import { Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import app from '../services/firebaseService';

const db = getFirestore(app);

export const getHome = async (req: Request, res: Response) => {
  const storiesRef = db.collection('stories').orderBy('popularity', 'desc').limit(10);
  const stories = await storiesRef.get();
  const returnStories = []

  if (stories.empty) {
    console.log('No matching documents.');
    res.status(404).json({});
  }

  stories.forEach((doc) => {
    returnStories.push({
      author: doc.data().author,
      description: doc.data().description,
      title: doc.data().title,
      id: doc.id
    })
  })

  res.status(200).json(returnStories);
}

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