import {
  CatchphraseFinderService,
  ICatchphraseFinderService,
} from '@/application/catchphrase/use-cases';
import { HttpSuccessResponseDTO } from '@/application/shared/http/dtos';
import { IRequest, NextFunction, Response } from '@/infrastructure/app/core';
import { catchphraseRepository } from '@/infrastructure/db/mongodb/repositories';

import { CatchphraseController } from './catchphrase.controller';

class FindCatchphrasesController extends CatchphraseController {
  constructor(
    private readonly catchphraseFinderService: ICatchphraseFinderService,
  ) {
    super();

    this.initializeRoutes();
  }

  protected handle = async (
    _request: IRequest,
    response: Response<unknown, Record<string, unknown>>,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const catchphrases = await this.catchphraseFinderService.find();
      const responseData = new HttpSuccessResponseDTO(catchphrases);

      response.status(responseData.httpStatus).send(responseData);
    } catch (error) {
      next(error);
    }
  };

  initializeRoutes = (): void => {
    this.router.get(`${this.path}`, this.handle);
  };
}

const catchphraseFinderService = new CatchphraseFinderService(
  catchphraseRepository,
);

const findCatchphrasesController = new FindCatchphrasesController(
  catchphraseFinderService,
);

export { findCatchphrasesController };
