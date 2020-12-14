import { Component, OnInit, OnDestroy } from '@angular/core';

import { SportSectionService } from '../../services/sport-section.service';
import { SportSection } from '../../interfaces/sport-section.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sport-section-list',
  templateUrl: './sport-section-list.component.html',
  styleUrls: ['./sport-section-list.component.scss'],
})
export class SportSectionListComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  sections: SportSection[] = [];
  searchTerm: string;

  constructor(private sportSectionService: SportSectionService) {}

  ngOnInit(): void {
    this.sportSections();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private sportSections() {
    this.sportSectionService
      .getSportSections()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((sections) => (this.sections = sections));
  }
}
