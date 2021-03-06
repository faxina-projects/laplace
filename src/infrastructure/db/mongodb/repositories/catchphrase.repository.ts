import {
  CatchphraseDTO,
  CreateCatchphraseDTO,
} from '@/application/catchphrase/dtos';
import { ICatchphraseRepository } from '@/application/catchphrase/repositories';

import {
  DeleteCatchphraseException,
  FindCatchphraseByIdException,
  FindCatchphrasesException,
  InsertCatchphraseException,
} from '../exceptions';
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
      throw new InsertCatchphraseException(
        error.message,
        error,
        catchphraseData,
      );
    }
  };

  update = async (catchphraseData: CatchphraseDTO): Promise<CatchphraseDTO> => {
    try {
      const { id, ...restData } = catchphraseData;
      await CatchPhrase.updateOne({ id }, restData);

      return catchphraseData;
    } catch (error: any) {
      throw new InsertCatchphraseException(
        error.message,
        error,
        catchphraseData,
      );
    }
  };

  findById = async (id: string): Promise<CatchphraseDTO | undefined> => {
    try {
      const catchphrase = await CatchPhrase.findById(id);
      return catchphrase ? CatchphraseMapper.toDTO(catchphrase) : undefined;
    } catch (error: any) {
      throw new FindCatchphraseByIdException(error.message, error, { id });
    }
  };

  find = async (): Promise<CatchphraseDTO[]> => {
    try {
      const catchphrases = await CatchPhrase.find();
      return catchphrases.map((catchphrase) =>
        CatchphraseMapper.toDTO(catchphrase),
      );
    } catch (error: any) {
      throw new FindCatchphrasesException(error.message, error);
    }
  };

  delete = async (id: string): Promise<void> => {
    try {
      await CatchPhrase.remove({ id });
    } catch (error: any) {
      throw new DeleteCatchphraseException(error.message, error, { id });
    }
  };
}

const catchphraseRepository = new CatchphraseRepository();

export { catchphraseRepository };
