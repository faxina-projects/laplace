import { InternalServerErrorException } from '@/application/shared/http/exceptions';

class FindCatchphraseException extends InternalServerErrorException {
  constructor(reason?: string, error?: unknown, data?: unknown) {
    super('Failed to find catchphrase', reason, error, data);
  }
}

export { FindCatchphraseException };
