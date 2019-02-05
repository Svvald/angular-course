import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(values: any[], key: string): any[] {
    return values.sort((current, next) => current[key] - next[key]);
  }

}
