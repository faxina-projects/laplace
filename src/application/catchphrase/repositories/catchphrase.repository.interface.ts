import { CatchphraseDTO, CreateCatchphraseDTO } from '../dtos';

interface ICatchphraseRepository {
  insert: (catchphraseData: CreateCatchphraseDTO) => Promise<CatchphraseDTO>;

  findById: (id: string) => Promise<CatchphraseDTO | undefined>;

  find: () => Promise<CatchphraseDTO[]>;

  // delete: (id: string) => Promise<CatchphraseDTO>;
}

export { ICatchphraseRepository };
