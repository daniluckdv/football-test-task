import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Game } from '../interfaces/game.interface';
import { Team } from '../interfaces/team.interface';
import { MenuService } from './menu.service';
import { iconPath } from '../constants/image-path.constant';

@Injectable()
export class ContestantService {
  constructor(private http: HttpClient, private menuService: MenuService) {}

  getGames(id: string): Observable<Game[]> {
    const params = this.getParams(id);
    const url = environment.apiUrl + '/eventslast.php';

    return this.http
      .get<{ results: Game[] }>(url, { params })
      .pipe(map((output) => output.results));
  }

  getTeam(id: string): Observable<Team> {
    const params = this.getParams(id);
    const url = environment.apiUrl + '/lookupteam.php';

    return this.http
      .get<{ teams: Team[] }>(url, { params })
      .pipe(
        map((output) => output.teams[0]),
        tap((team) => {
          const icon = iconPath + team.strSport + '.png';
          this.menuService.sport$.next({ title: team.strSport, icon });
          this.menuService.country$.next({
            title: team.strCountry,
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
