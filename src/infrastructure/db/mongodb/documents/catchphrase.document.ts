import { Document } from 'mongoose';

interface CatchphraseDocument extends Document {
  id: string;
  movieName: string;
  catchphrase: string;
  movieContext: string;
}

export { CatchphraseDocument };
