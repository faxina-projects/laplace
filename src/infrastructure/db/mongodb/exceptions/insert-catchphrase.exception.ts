import { InternalServerErrorException } from '@/application/shared/http/exceptions';

class InsertCatchphraseException extends InternalServerErrorException {
  constructor(reason?: string, error?: unknown, data?: unknown) {
    super('Failed to insert catchphrase', reason, error, data);
  }
}

export { InsertCatchphraseException };
