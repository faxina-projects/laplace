import { CatchphraseDTO, CreateCatchphraseDTO } from '../dtos';

interface ICatchphraseRepository {
  insert: (catchphraseData: CreateCatchphraseDTO) => Promise<CatchphraseDTO>;

  update: (catchphraseData: CatchphraseDTO) => Promise<CatchphraseDTO>;

  findById: (id: string) => Promise<CatchphraseDTO | undefined>;

  find: () => Promise<CatchphraseDTO[]>;

  delete: (id: string) => Promise<void>;
}

export { ICatchphraseRepository };
