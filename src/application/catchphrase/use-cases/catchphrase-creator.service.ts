import { HttpBaseException } from '@/application/shared/http/exceptions';

import { CatchphraseDTO, CreateCatchphraseDTO } from '../dtos';
import { CreateCatchphraseException } from '../exceptions';
import { ICatchphraseRepository } from '../repositories';
import { ICatchphraseCreatorService } from './catchphrase-creator.service.interface';

class CatchphraseCreatorService implements ICatchphraseCreatorService {
  constructor(private readonly catchphraseRepository: ICatchphraseRepository) {}

  create = async (
    catchphraseData: CreateCatchphraseDTO,
  ): Promise<CatchphraseDTO> => {
    try {
      const catchphrase = await this.catchphraseRepository.insert(
        catchphraseData,
      );

      return catchphrase;
    } catch (error: any) {
      if (HttpBaseException.isSafeError(error)) {
        throw error;
      }

      throw new CreateCatchphraseException(error.message, error, {
        catchphraseData,
      });
    }
  };
}

export { CatchphraseCreatorService };
