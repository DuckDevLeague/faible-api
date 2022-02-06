import { Request, Response } from 'express';
import { getFirestore } from 'firebase-admin/firestore';
import app from '../services/firebaseService';

const db = getFirestore(app);

export const getHome = async (req: Request, res: Response) => {
  let storiesPopular = null;
  let storiesRecent = null;

  if (req.query['adultContent'] === 'false') {
    const storiesRefPopular = db.collection('stories').orderBy('popularity', 'desc').limit(10);
    const storiesRefRecent = db.collection('stories').orderBy('createdAt', 'desc').limit(5);
    storiesPopular = await storiesRefPopular.get();
    storiesRecent = await storiesRefRecent.get();
  } else {
    const storiesRefPopular = db.collection('stories');
    const storiesRefRecent = db.collection('stories');
    storiesPopular = await storiesRefPopular.where('adultContent', '==', false).limit(10).get();
    storiesRecent = await storiesRefRecent.where('adultContent', '==', false).limit(5).get();
  }

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

  if (story.exists) {
    const dataResponse = {
      ...story.data(),
      id: id
    };
    return res.status(200).json(dataResponse);
  } 

  return res.status(404).json({});
}

export const searchStories = async (req: Request, res: Response) => {
  const { param } = req.params;
  console.log('aa');
  let storiesRef = null;
  const storyGenres = ['Fantasia', 'Comédia', 'Aventura'];
  if (storyGenres.includes(param)) {
    storiesRef = db.collection('stories').where("genres", "array-contains", param);
  } else {
    storiesRef = db.collection('stories').where("title", "==", param);
  }

  const stories = await storiesRef.get();
  const finalStories = []

  if (stories.empty) {
    console.log('No matching documents.');
    res.status(404).json({});
  }

  stories.forEach((doc) => {
    finalStories.push({
      author: doc.data().author,
      title: doc.data().title,
      bannerImage: doc.data().bannerImage,
      id: doc.id
    })
  })

  return res.status(200).json(finalStories);

}
