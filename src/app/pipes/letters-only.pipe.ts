import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lettersOnly'
})
export class LettersOnlyPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
  }

}
