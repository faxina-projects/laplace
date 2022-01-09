import { HttpMessages, HttpStatus } from '../configs';
import { HttpBaseException } from './http-base.exception';

class InternalServerErrorException extends HttpBaseException {
  constructor(
    message: string = HttpMessages.INTERNAL_SERVER_ERROR,
    reason?: string,
    error?: any,
    data?: any,
  ) {
    super(message, reason, HttpStatus.INTERNAL_SERVER_ERROR, error, data);
  }
}

export { InternalServerErrorException };
