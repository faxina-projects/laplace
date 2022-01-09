import { model, Schema } from 'mongoose';

import { CatchphraseDocument } from '../documents';

const catchPhraseSchema = new Schema({
  movieName: {
    type: String,
  },
  catchphrase: {
    type: String,
  },
  movieContext: {
    type: String,
  },
});

const CatchPhrase = model<CatchphraseDocument>(
  'CatchPhrase',
  catchPhraseSchema,
);

export { CatchPhrase };
