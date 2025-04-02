import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: false
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], text: string, column: string): any[] {

    if (text == '' || text == undefined) {
      return array;
    }

    const rt = array.filter(item => {
      return item[column].toLowerCase()
        .includes(text.toLowerCase());
    });
    return rt;
  }
}
