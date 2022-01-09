import { HttpBaseException } from '@/application/shared/http/exceptions';

import { DeleteCatchphraseException } from '../exceptions';
import { ICatchphraseRepository } from '../repositories';
import { ICatchphraseDeleterService } from './catchphrase-deleter.service.interface';
import { ICatchphraseFinderService } from './catchphrase-finder.service.interface';

class CatchphraseDeleterService implements ICatchphraseDeleterService {
  constructor(
    private readonly catchphraseFinderService: ICatchphraseFinderService,
    private readonly catchphraseRepository: ICatchphraseRepository,
  ) {}

  delete = async (id: string): Promise<void> => {
    try {
      await this.catchphraseFinderService.findById(id);
      await this.catchphraseRepository.delete(id);
    } catch (error: any) {
      if (HttpBaseException.isSafeError(error)) {
        throw error;
      }

      throw new DeleteCatchphraseException(error.message, error);
    }
  };
}

export { CatchphraseDeleterService };
