import { PipeTransform, BadRequestException } from '@nestjs/common';

export class parseObjectIdPipe implements PipeTransform {
  async transform(value: any) {
    if (value.length !== 24) {
      throw new BadRequestException('Invalid task id');
    }

    return value;
  }
}
