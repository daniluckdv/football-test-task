import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Game } from '../interfaces/game.interface';
import { Team } from '../interfaces/team.interface';

@Injectable()
export class ContestantService {
  constructor(private http: HttpClient) {}

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
      .pipe(map((output) => output.teams[0]));
  }

  private getParams(id: string): HttpParams {
    let params = new HttpParams();
    params = params.append('id', id);
    return params;
  }
}
