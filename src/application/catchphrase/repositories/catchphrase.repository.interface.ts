import { CatchphraseDTO, CreateCatchphraseDTO } from '../dtos';

interface ICatchphraseRepository {
  insert: (catchphraseData: CreateCatchphraseDTO) => Promise<CatchphraseDTO>;
}

export { ICatchphraseRepository };
