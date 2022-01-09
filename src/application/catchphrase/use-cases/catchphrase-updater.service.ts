import { HttpBaseException } from '@/application/shared/http/exceptions';

import { CatchphraseDTO, UpdateCatchphraseDTO } from '../dtos';
import { UpdateCatchphraseException } from '../exceptions';
import { ICatchphraseRepository } from '../repositories';
import { ICatchphraseFinderService } from './catchphrase-finder.service.interface';
import { ICatchphraseUpdaterService } from './catchphrase-updater.service.interface';

class CatchphraseUpdaterService implements ICatchphraseUpdaterService {
  constructor(
    private readonly catchphraseFinderService: ICatchphraseFinderService,
    private readonly catchphraseRepository: ICatchphraseRepository,
  ) {}

  update = async (
    id: string,
    catchphraseData: UpdateCatchphraseDTO,
  ): Promise<CatchphraseDTO> => {
    try {
      const catchphrase = await this.catchphraseFinderService.findById(id);

      const catchphraseUpdated = await this.catchphraseRepository.update({
        ...catchphrase,
        ...catchphraseData,
      });

      return catchphraseUpdated;
    } catch (error: any) {
      if (HttpBaseException.isSafeError(error)) {
        throw error;
      }

      throw new UpdateCatchphraseException(error.message, error, {
        catchphraseData,
      });
    }
  };
}

export { CatchphraseUpdaterService };
