import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SportSectionService } from '../../../services/sport-section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  sportName: string;
  countries = [];

  constructor(
    private route: ActivatedRoute,
    private sportSectionService: SportSectionService
  ) {}

  ngOnInit(): void {
    this.sportName = this.route.snapshot.paramMap.get('name');
    this.getSportLeagues();
  }

  private getSportLeagues() {
    this.sportSectionService
      .getSportLeagues(this.sportName)
      .subscribe((countries) => (this.countries = countries));
  }
}
