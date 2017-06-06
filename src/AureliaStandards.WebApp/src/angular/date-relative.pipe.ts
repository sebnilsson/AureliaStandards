import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({ name: 'dateRelative' })
export class DateRelativePipe implements PipeTransform {
    transform(value) {
        return moment(value).fromNow();
    }
}