import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message?) {
    super(message?? 'Registro inválido', HttpStatus.BAD_REQUEST);
  }
}
