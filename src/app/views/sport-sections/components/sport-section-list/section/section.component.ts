import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SportSectionService } from '../../../services/sport-section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  sportName: string;
  countries = [];

  constructor(
    private route: ActivatedRoute,
    private sportSectionService: SportSectionService
  ) {}

  ngOnInit(): void {
    this.sportName = this.route.snapshot.paramMap.get('name');
    this.getSportLeagues();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getSportLeagues() {
    this.sportSectionService
      .getSportLeagues(this.sportName)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((countries) => (this.countries = countries));
  }
}
