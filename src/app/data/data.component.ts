import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogParserService, LogEntry } from '../services/log-parser.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {
  logEntries: LogEntry[] = [];
  private logEntriesSubscription!: Subscription;

  viewState: 'global' | 'table' | 'graph' | 'other' = 'global';
  uploadFileName!: string;
  uploadFileSize!: number;
  levelsCount: { [key: string]: number } = {};

  constructor(private logParserService: LogParserService) { }

  ngOnInit(): void {
    this.logEntriesSubscription = this.logParserService.logEntries$.subscribe(
      logEntries => {
        this.logEntries = logEntries;
        this.countLevels();
      }
    );
    this.uploadFileName = this.logParserService.getSelectedFileName();
    this.uploadFileSize = this.logParserService.getSelectedFileSize();
  }

  ngOnDestroy(): void {
    this.logEntriesSubscription.unsubscribe();
  }

  countLevels(): void {
    this.levelsCount = this.logEntries.reduce((acc, entry) => {
      acc[entry.level] = (acc[entry.level] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  navigateToTableWithFilter(level: string): void {
    this.logParserService.setSelectedLevelFilter(level);
    this.viewState = 'table';
  }
}
