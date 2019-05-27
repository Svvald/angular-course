import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value < 60) {
      return `${value}min`;
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (minutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes}min`;
  }

}
