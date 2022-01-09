import { BaseController } from '../base.controller';

abstract class CatchphraseController extends BaseController {
  constructor() {
    super('/catchphrases');
  }
}

export { CatchphraseController };
