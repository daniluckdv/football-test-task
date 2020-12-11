import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../../interfaces/game.interface';
import { Team } from '../../interfaces/team.interface';
import { ContestantService } from '../../services/contestant.service';

@Component({
  selector: 'app-contestant',
  templateUrl: './contestant.component.html',
  styleUrls: ['./contestant.component.scss'],
})
export class ContestantComponent implements OnInit {
  private id: string;

  team: Team;
  games: Game[] = [];

  constructor(
    private contestantService: ContestantService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getTeam();
    this.getGames();
  }

  private getGames() {
    this.contestantService
      .getGames(this.id)
      .subscribe((games) => (this.games = games));
  }

  private getTeam() {
    this.contestantService
      .getTeam(this.id)
      .subscribe((team) => (this.team = team));
  }
}
