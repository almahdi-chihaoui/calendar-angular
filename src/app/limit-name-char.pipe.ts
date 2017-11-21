import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitNameChar'
})
export class LimitNameCharPipe implements PipeTransform {

  transform(input: string, limit: number): any {
    if(input)
    return input.length > limit ? input.substr(0, limit) : input;
  }

}
