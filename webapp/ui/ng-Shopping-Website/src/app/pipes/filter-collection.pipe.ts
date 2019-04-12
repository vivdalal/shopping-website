import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCollection'
})
export class FilterCollectionPipe<T> implements PipeTransform {

  transform(data: T[], key?: string, value?: string): T[] {
    if (!key || !value) {
      return data;
    }
    return data.filter(item => item[key] === value);
  }

}
