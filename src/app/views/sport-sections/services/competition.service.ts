import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Game } from '../interfaces/game.interface';
import { LeagueDetails } from '../interfaces/league.interface';
import { Team } from '../interfaces/team.interface';
import { MenuService } from './menu.service';
import { iconPath } from '../constants/image-path.constant';

@Injectable()
export class CompetitionService {
  constructor(private http: HttpClient, private menuService: MenuService) {}

  getTeams(strSport: string, strCountry: string): Observable<Team[]> {
    const url = environment.apiUrl + '/search_all_teams.php';
    let params = new HttpParams();

    params = params.append('s', strSport);
    params = params.append('c', strCountry);

    return this.http
      .get<{ teams: Team[] }>(url, { params })
      .pipe(map((output) => output.teams || []));
  }

  getEvents(id: string): Observable<Game[]> {
    const url = environment.apiUrl + '/eventspastleague.php';
    const params = this.getParams(id);

    return this.http
      .get<{ events: Game[] }>(url, { params })
      .pipe(map((output) => output.events || []));
  }

  getSeasons(id: string): Observable<any[]> {
    const url = environment.apiUrl + '/search_all_seasons.php';
    const params = this.getParams(id);

    return this.http
      .get<{ seasons: any[] }>(url, { params })
      .pipe(map((output) => output.seasons || []));
  }

  getLeague(id: string): Observable<LeagueDetails> {
    const params = this.getParams(id);
    const url = environment.apiUrl + '/lookupleague.php';

    return this.http
      .get<{ leagues: LeagueDetails[] }>(url, { params })
      .pipe(
        map((output) => output.leagues[0]),
        tap((res) => {
          const icon = iconPath + res.strSport + '.png';
          this.menuService.sport$.next({
            title: res.strSport,
            icon,
          });

          this.menuService.country$.next({
            title: res.strCountry,
            icon: null,
          });
        })
      );
  }

  private getParams(id: string): HttpParams {
    let params = new HttpParams();
    params = params.append('id', id);
    return params;
  }
}
