import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { LogEntry, LogParserService } from "../services/log-parser.service";
import { Subscription } from "rxjs";
import {LinesViewComponent} from "../lines-view/lines-view.component";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  logEntries: LogEntry[] = [];
  private logEntriesSubscription!: Subscription;
  expandedEntry: LogEntry | null = null;

  selectedLevels: { [key: string]: boolean } = {
    ERROR: true,
    WARN: true,
    INFO: true,
    DEBUG: true,
    TRACE: true,
  };
  @Output() rowClick: EventEmitter<LogEntry> = new EventEmitter();

  constructor(private logParserService: LogParserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.logEntriesSubscription = this.logParserService.logEntries$.subscribe(
      logEntries => this.logEntries = logEntries
    );
  }

  ngOnDestroy(): void {
    this.logEntriesSubscription.unsubscribe();
  }

  filteredLogEntries(): LogEntry[] {
    return this.logEntries.filter((entry) => this.selectedLevels[entry.level]);
  }

  onLevelToggle(level: string): void {
    this.selectedLevels[level] = !this.selectedLevels[level];
  }

  toggleExpandedEntry(entry: LogEntry): void {
    if (this.expandedEntry === entry) {
      this.expandedEntry = null;
    } else {
      this.expandedEntry = entry;
    }
  }
  hasErrorEntries(): boolean {
    return this.filteredLogEntries().some(entry => entry.level === 'ERROR');
  }
  onRowClick(entry: LogEntry): void {
    const dialogRef = this.dialog.open(LinesViewComponent, {
      width: '700px',
      data: { selectedEntry: entry }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
