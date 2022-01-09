import {
  CatchphraseCreatorService,
  ICatchphraseCreatorService,
} from '@/application/catchphrase/use-cases';
import { HttpCreatedResponseDTO } from '@/application/shared/http/dtos';
import { IRequest, NextFunction, Response } from '@/infrastructure/app/core';
import { catchphraseRepository } from '@/infrastructure/db/mongodb/repositories';

import { CatchphraseController } from './catchphrase.controller';

class CreateCatchphraseController extends CatchphraseController {
  constructor(
    private readonly catchphraseCreatorService: ICatchphraseCreatorService,
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
      const data = request.body;
      const catchphrase = await this.catchphraseCreatorService.create(data);
      const responseData = new HttpCreatedResponseDTO(
        'Catchphrase created',
        catchphrase,
      );

      response.status(responseData.httpStatus).send(responseData);
    } catch (error) {
      next(error);
    }
  };

  initializeRoutes = (): void => {
    this.router.post(`${this.path}`, this.handle);
  };
}

const catchphraseCreatorService = new CatchphraseCreatorService(
  catchphraseRepository,
);

const createCatchphraseController = new CreateCatchphraseController(
  catchphraseCreatorService,
);

export { createCatchphraseController };
