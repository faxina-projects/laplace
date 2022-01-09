import {
  CatchphraseCreatorService,
  ICatchphraseCreatorService,
} from '@/application/catchphrase/use-cases';
import { HttpCreatedResponseDTO } from '@/application/shared/http/dtos';
import { IRequest, NextFunction, Response } from '@/infrastructure/app/core';
import { catchphraseRepository } from '@/infrastructure/db/mongodb/repositories';

import { BaseController } from '../base.controller';

class CatchphraseController extends BaseController {
  constructor(
    private readonly catchphraseCreatorService: ICatchphraseCreatorService,
  ) {
    super('/catchphrase');

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

const catchphraseController = new CatchphraseController(
  catchphraseCreatorService,
);

export { catchphraseController };
