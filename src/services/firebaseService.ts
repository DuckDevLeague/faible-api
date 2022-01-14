import dotenv from 'dotenv';
import { initializeApp, cert} from 'firebase-admin/app';

dotenv.config();

const firebaseConfig = {
  credential: cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
  }),
};

const app = initializeApp(firebaseConfig);

export default app;