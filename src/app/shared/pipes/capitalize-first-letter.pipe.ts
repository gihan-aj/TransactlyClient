import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter',
  standalone: true,
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    if (Boolean(value) && value.length > 1) {
      return value[0].toUpperCase() + value.slice(1);
    } else if (value.length === 1) {
      return value.toUpperCase();
    } else {
      return '';
    }
  }
}
