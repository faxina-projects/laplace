import { InternalServerErrorException } from '@/application/shared/http/exceptions';

class UpdateCatchphraseException extends InternalServerErrorException {
  constructor(reason?: string, error?: unknown, data?: unknown) {
    super('Failed to update catchphrase', reason, error, data);
  }
}

export { UpdateCatchphraseException };
