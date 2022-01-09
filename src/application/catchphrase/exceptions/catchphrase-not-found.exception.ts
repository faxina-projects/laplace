import { InternalServerErrorException } from '@/application/shared/http/exceptions';

class CatchphraseNotFoundException extends InternalServerErrorException {
  constructor(data?: unknown) {
    super('Catchphrase no found', undefined, undefined, data);
  }
}

export { CatchphraseNotFoundException };
