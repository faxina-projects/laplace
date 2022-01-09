import { CatchphraseDTO } from '@/application/catchphrase/dtos';

import { CatchphraseDocument } from '../documents';

class CatchphraseMapper {
  static toDTO = (catchphraseData: CatchphraseDocument): CatchphraseDTO => {
    const { id, movieName, catchphrase, movieContext } = catchphraseData;

    return CatchphraseDTO.build({
      id,
      movieName,
      catchphrase,
      movieContext,
    });
  };
}

export { CatchphraseMapper };
