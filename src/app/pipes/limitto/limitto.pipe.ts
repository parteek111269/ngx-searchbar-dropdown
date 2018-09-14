import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitto'
})
export class LimittoPipe implements PipeTransform {
	public transform(array: any[], itemsCount: number, startIndex: number = 0) {
    	if (!Array.isArray(array)) {
        	return array;
    	}
    	return array.slice(startIndex, startIndex + itemsCount);
  	}
}
