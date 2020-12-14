import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { iconPath } from '../constants/image-path.constant';
import { SportSection } from '../interfaces/sport-section.interface';
import { MenuService } from './menu.service';

@Injectable()
export class SportSectionService {
  constructor(private http: HttpClient, private menu: MenuService) {}

  getSportSections(): Observable<SportSection[]> {
    const url = environment.apiUrl + '/all_sports.php';
    return this.http.get<{ sports: SportSection[] }>(url).pipe(
      map((output) => {
        const sections = output.sports.map((section) => {
          const icon = iconPath + section.strSport + '.png';
          return { ...section, icon };
        });

        return sections;
      })
    );
  }

  getSportLeagues(sportName: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('s', sportName);
    const url = environment.apiUrl + '/search_all_leagues.php';
    return this.http
      .get<{ countrys: any[] }>(url, { params })
      .pipe(
        map((output) => output.countrys),
        tap(() => {
          const icon = iconPath + sportName + '.png';
          this.menu.sport$.next({ title: sportName, icon });
        })
      );
  }
}
