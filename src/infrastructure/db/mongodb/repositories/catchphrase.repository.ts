import {
  CatchphraseDTO,
  CreateCatchphraseDTO,
} from '@/application/catchphrase/dtos';
import { ICatchphraseRepository } from '@/application/catchphrase/repositories';

import { InsertCatchphraseException } from '../exceptions';
import { CatchphraseMapper } from '../mapper';
import { CatchPhrase } from '../models';

class CatchphraseRepository implements ICatchphraseRepository {
  insert = async (
    catchphraseData: CreateCatchphraseDTO,
  ): Promise<CatchphraseDTO> => {
    try {
      const catchphrase = new CatchPhrase(catchphraseData);

      const newCatchphrase = await catchphrase.save();
      return CatchphraseMapper.toDTO(newCatchphrase);
    } catch (error: any) {
      console.log(error);
      throw new InsertCatchphraseException(
        error.message,
        error,
        catchphraseData,
      );
    }
  };
}

const catchphraseRepository = new CatchphraseRepository();

export { catchphraseRepository };
