import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { SportSection } from '../interfaces/sport-section.interface';

const iconPath = 'https://www.thesportsdb.com/images/icons/';

@Injectable()
export class SportSectionService {
  constructor(private http: HttpClient) {}

  getSportSections(): Observable<SportSection[]> {
    const url = environment.apiUrl + '/all_sports.php';
    return this.http.get<{ sports: SportSection[] }>(url).pipe(
      tap((output) => console.log(output)),
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
      .pipe(map((output) => output.countrys));
  }
}
