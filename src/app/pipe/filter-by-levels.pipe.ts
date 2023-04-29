// filter-by-levels.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { LogEntry } from '../services/log-parser.service';

@Pipe({
  name: 'filterByLevels',
})
export class FilterByLevelsPipe implements PipeTransform {
  transform(logEntries: LogEntry[], levels: string[]): LogEntry[] {
    return logEntries.filter(entry => levels.includes(entry.level));
  }
}
