import {
  CatchphraseDeleterService,
  CatchphraseFinderService,
  ICatchphraseDeleterService,
} from '@/application/catchphrase/use-cases';
import { HttpSuccessResponseDTO } from '@/application/shared/http/dtos';
import { IRequest, NextFunction, Response } from '@/infrastructure/app/core';
import { catchphraseRepository } from '@/infrastructure/db/mongodb/repositories';

import { CatchphraseController } from './catchphrase.controller';

class DeleteCatchphraseController extends CatchphraseController {
  constructor(
    private readonly catchphraseDeleterService: ICatchphraseDeleterService,
  ) {
    super();

    this.initializeRoutes();
  }

  protected handle = async (
    request: IRequest,
    response: Response<unknown, Record<string, unknown>>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { params } = request;
      const id = params?.id;
      const catchphrase = await this.catchphraseDeleterService.delete(id);
      const responseData = new HttpSuccessResponseDTO(
        catchphrase,
        'Catchphrase deleted',
      );

      response.status(responseData.httpStatus).send(responseData);
    } catch (error) {
      next(error);
    }
  };

  initializeRoutes = (): void => {
    this.router.delete(`${this.path}/:id`, this.handle);
  };
}

const catchphraseFinderService = new CatchphraseFinderService(
  catchphraseRepository,
);

const catchphraseDeleterService = new CatchphraseDeleterService(
  catchphraseFinderService,
  catchphraseRepository,
);

const deleteCatchphraseController = new DeleteCatchphraseController(
  catchphraseDeleterService,
);

export { deleteCatchphraseController };
