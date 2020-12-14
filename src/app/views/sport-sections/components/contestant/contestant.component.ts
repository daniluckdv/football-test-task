import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Game } from '../../interfaces/game.interface';
import { Team } from '../../interfaces/team.interface';
import { ContestantService } from '../../services/contestant.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contestant',
  templateUrl: './contestant.component.html',
  styleUrls: ['./contestant.component.scss'],
})
export class ContestantComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  private id: string;

  team: Team;
  games: Game[] = [];

  constructor(
    private contestantService: ContestantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.getTeam();
      this.getGames();
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getGames() {
    this.contestantService
      .getGames(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((games) => (this.games = games));
  }

  private getTeam() {
    this.contestantService
      .getTeam(this.id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((team) => (this.team = team));
  }
}
