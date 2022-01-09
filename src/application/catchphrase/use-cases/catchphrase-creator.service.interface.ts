import { CatchphraseDTO, CreateCatchphraseDTO } from '../dtos';

interface ICatchphraseCreatorService {
  create: (catchphraseData: CreateCatchphraseDTO) => Promise<CatchphraseDTO>;
}

export { ICatchphraseCreatorService };
