import { InternalServerErrorException } from '@/application/shared/http/exceptions';

class FindCatchphrasesException extends InternalServerErrorException {
  constructor(reason?: string, error?: unknown, data?: unknown) {
    super('Failed to find catchphrases', reason, error, data);
  }
}

export { FindCatchphrasesException };
