import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../../interfaces/game.interface';
import { LeagueDetails } from '../../interfaces/league.interface';
import { Team } from '../../interfaces/team.interface';
import { CompetitionService } from '../../services/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss'],
})
export class CompetitionComponent implements OnInit {
  private id: string;

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

  private getEvents() {
    this.competitionService.getEvents(this.id).subscribe((events) => {
      this.events = events;
    });
  }

  private getSeasons() {
    this.competitionService.getSeasons(this.id).subscribe((seasons) => {
      this.seasons = seasons;
    });
  }

  private getLeague() {
    this.competitionService.getLeague(this.id).subscribe((league) => {
      this.league = league;
      this.getTeams(league.strSport, league.strCountry);
    });
  }

  private getTeams(strSport: string, strCountry: string) {
    this.competitionService
      .getTeams(strSport, strCountry)
      .subscribe((teams) => {
        this.teams = teams;
      });
  }
}
