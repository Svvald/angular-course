import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], [property, propValue]: string[]): any[] {
    return value.filter((elem) => elem[property].indexOf(propValue) !== -1);
  }

}
