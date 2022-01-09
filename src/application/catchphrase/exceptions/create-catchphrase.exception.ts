import { InternalServerErrorException } from '@/application/shared/http/exceptions';

class CreateCatchphraseException extends InternalServerErrorException {
  constructor(reason?: string, error?: unknown, data?: unknown) {
    super('Failed to create catchphrase', reason, error, data);
  }
}

export { CreateCatchphraseException };
