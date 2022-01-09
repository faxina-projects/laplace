import { CatchphraseDTO, UpdateCatchphraseDTO } from '../dtos';

interface ICatchphraseUpdaterService {
  update: (
    id: string,
    catchphraseData: UpdateCatchphraseDTO,
  ) => Promise<CatchphraseDTO>;
}

export { ICatchphraseUpdaterService };
