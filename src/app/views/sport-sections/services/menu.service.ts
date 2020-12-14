import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const DEFAULT_COUNTRY_VALUE = { title: 'Country', icon: null };
const DEFAULT_SPORT_VALUE = { title: 'Sport', icon: null };
@Injectable()
export class MenuService {
  sport$ = new BehaviorSubject(DEFAULT_SPORT_VALUE);
  country$ = new BehaviorSubject(DEFAULT_COUNTRY_VALUE);

  get navigationData$() {
    return combineLatest([this.sport$, this.country$]).pipe(
      map(([sport, country]) => ({ sport, country }))
    );
  }

  clearNavigationData(): void {
    this.sport$.next(DEFAULT_SPORT_VALUE);
    this.country$.next(DEFAULT_COUNTRY_VALUE);
  }
}
