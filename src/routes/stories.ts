import { Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import app from '../services/firebaseService';

const db = getFirestore(app);

export const getHome = async (req: Request, res: Response) => {
  const storiesRefPopular = db.collection('stories').orderBy('popularity', 'desc').limit(10);
  const storiesRefRecent = db.collection('stories').orderBy('createdAt', 'desc').limit(5);
  const storiesPopular = await storiesRefPopular.get();
  const storiesRecent = await storiesRefRecent.get();
  const returnStoriesPopular = []
  const returnStoriesRecent = []

  if (storiesPopular.empty || storiesRecent.empty) {
    console.log('No matching documents.');
    res.status(404).json({});
  }

  storiesPopular.forEach((doc) => {
    returnStoriesPopular.push({
      author: doc.data().author,
      description: doc.data().description,
      title: doc.data().title,
      bannerImage: doc.data().bannerImage,
      id: doc.id
    })
  });

  storiesRecent.forEach((doc) => {
    returnStoriesRecent.push({
      author: doc.data().author,
      title: doc.data().title,
      bannerImage: doc.data().bannerImage,
      id: doc.id
    })
  });

  res.status(200).json({
    new: returnStoriesRecent,
    popular: returnStoriesPopular,
  });
}

export const getStoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const storiesRef = db.collection('stories');
  const story = await storiesRef.doc(id).get();
  console.log('log');
  if (story.exists) {
    const dataResponse = {
      ...story.data(),
      id: id
    };
    return res.status(200).json(dataResponse);
  } 

  return res.status(404).json({});
}