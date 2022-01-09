import { CatchphraseDTO } from '../dtos';

interface ICatchphraseFinderService {
  findById: (id: string) => Promise<CatchphraseDTO>;

  find: () => Promise<CatchphraseDTO[]>;
}

export { ICatchphraseFinderService };
