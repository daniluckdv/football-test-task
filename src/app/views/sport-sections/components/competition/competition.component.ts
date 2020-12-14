import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Game } from '../../interfaces/game.interface';
import { LeagueDetails } from '../../interfaces/league.interface';
import { Team } from '../../interfaces/team.interface';
import { CompetitionService } from '../../services/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  private id: string;
  private fullTeamList = [];

  cols = ['strTeam', 'strStadium', 'intStadiumCapacity'];
  league: LeagueDetails;
  teams: Team[] = [];
  events: Game[] = [];
  seasons = [];

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getLeague();
    this.getEvents();
    this.getSeasons();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchTeams(searchedTeam: string) {
    if (!searchedTeam.length) {
      this.teams = this.fullTeamList;
      return;
    }

    this.teams = this.teams.filter((team) =>
      team.strTeam.toLowerCase().includes(searchedTeam.toLowerCase())
    );
  }

  private getEvents() {
    this.competitionService
      .getEvents(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((events) => (this.events = events));
  }

  private getSeasons() {
    this.competitionService
      .getSeasons(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((seasons) => (this.seasons = seasons));
  }

  private getLeague() {
    this.competitionService
      .getLeague(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((league) => {
        this.league = league;
        this.getTeams(league.strSport, league.strCountry);
      });
  }

  private getTeams(strSport: string, strCountry: string) {
    this.competitionService
      .getTeams(strSport, strCountry)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((teams) => {
        this.fullTeamList = teams;
        this.teams = teams;
      });
  }
}
