import {
  CatchphraseFinderService,
  CatchphraseUpdaterService,
  ICatchphraseUpdaterService,
} from '@/application/catchphrase/use-cases';
import { HttpSuccessResponseDTO } from '@/application/shared/http/dtos';
import { IRequest, NextFunction, Response } from '@/infrastructure/app/core';
import { catchphraseRepository } from '@/infrastructure/db/mongodb/repositories';

import { CatchphraseController } from './catchphrase.controller';

class UpdateCatchphraseController extends CatchphraseController {
  constructor(
    private readonly catchphraseUpdaterService: ICatchphraseUpdaterService,
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
      const { params, body } = request;
      const id = params?.id;
      const catchphrase = await this.catchphraseUpdaterService.update(id, body);
      const responseData = new HttpSuccessResponseDTO(
        catchphrase,
        'Catchphrase updated',
      );

      response.status(responseData.httpStatus).send(responseData);
    } catch (error) {
      next(error);
    }
  };

  initializeRoutes = (): void => {
    this.router.put(`${this.path}/:id`, this.handle);
  };
}

const catchphraseFinderService = new CatchphraseFinderService(
  catchphraseRepository,
);

const catchphraseUpdaterService = new CatchphraseUpdaterService(
  catchphraseFinderService,
  catchphraseRepository,
);

const updateCatchphraseController = new UpdateCatchphraseController(
  catchphraseUpdaterService,
);

export { updateCatchphraseController };
