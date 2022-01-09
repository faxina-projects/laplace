import {
  CatchphraseFinderService,
  ICatchphraseFinderService,
} from '@/application/catchphrase/use-cases';
import { HttpSuccessResponseDTO } from '@/application/shared/http/dtos';
import { IRequest, NextFunction, Response } from '@/infrastructure/app/core';
import { catchphraseRepository } from '@/infrastructure/db/mongodb/repositories';

import { CatchphraseController } from './catchphrase.controller';

class FindCatchphraseByIdController extends CatchphraseController {
  constructor(
    private readonly catchphraseFinderService: ICatchphraseFinderService,
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
      const id = request?.params?.id;
      const catchphrases = await this.catchphraseFinderService.findById(id);
      const responseData = new HttpSuccessResponseDTO(catchphrases);

      response.status(responseData.httpStatus).send(responseData);
    } catch (error) {
      next(error);
    }
  };

  initializeRoutes = (): void => {
    this.router.get(`${this.path}/:id`, this.handle);
  };
}

const catchphraseFinderService = new CatchphraseFinderService(
  catchphraseRepository,
);

const findCatchphraseByIdController = new FindCatchphraseByIdController(
  catchphraseFinderService,
);

export { findCatchphraseByIdController };
