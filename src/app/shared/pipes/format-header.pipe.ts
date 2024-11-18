import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHeader',
  standalone: true,
})
export class FormatHeaderPipe implements PipeTransform {
  transform(value: string): string {
    return String(value)
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }
}
