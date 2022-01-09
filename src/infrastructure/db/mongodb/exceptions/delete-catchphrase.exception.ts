import { InternalServerErrorException } from '@/application/shared/http/exceptions';

class DeleteCatchphraseException extends InternalServerErrorException {
  constructor(reason?: string, error?: unknown, data?: unknown) {
    super('Failed to delete catchphrase', reason, error, data);
  }
}

export { DeleteCatchphraseException };
