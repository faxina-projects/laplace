import { HttpBaseException } from '@/application/shared/http/exceptions';

import { CatchphraseDTO } from '../dtos';
import {
  CatchphraseNotFoundException,
  FindCatchphraseByIdException,
  FindCatchphraseException,
} from '../exceptions';
import { ICatchphraseRepository } from '../repositories';
import { ICatchphraseFinderService } from './catchphrase-finder.service.interface';

class CatchphraseFinderService implements ICatchphraseFinderService {
  constructor(private readonly catchphraseRepository: ICatchphraseRepository) {}

  findById = async (id: string): Promise<CatchphraseDTO> => {
    try {
      const catchphrase = await this.catchphraseRepository.findById(id);

      if (!catchphrase) {
        throw new CatchphraseNotFoundException({ id });
      }

      return catchphrase;
    } catch (error: any) {
      if (HttpBaseException.isSafeError(error)) {
        throw error;
      }

      throw new FindCatchphraseByIdException(error.message, error);
    }
  };

  find = async (): Promise<CatchphraseDTO[]> => {
    try {
      const catchphrases = await this.catchphraseRepository.find();

      return catchphrases;
    } catch (error: any) {
      if (HttpBaseException.isSafeError(error)) {
        throw error;
      }

      throw new FindCatchphraseException(error.message, error);
    }
  };
}

export { CatchphraseFinderService };
