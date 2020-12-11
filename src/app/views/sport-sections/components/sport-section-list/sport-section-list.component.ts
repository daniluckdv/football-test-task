import { Component, OnInit } from '@angular/core';

import { SportSectionService } from '../../services/sport-section.service';
import { SportSection } from '../../interfaces/sport-section.interface';

@Component({
  selector: 'app-sport-section-list',
  templateUrl: './sport-section-list.component.html',
  styleUrls: ['./sport-section-list.component.scss'],
})
export class SportSectionListComponent implements OnInit {
  sections: SportSection[] = [];
  searchTerm: string;

  constructor(private sportSectionService: SportSectionService) {}

  ngOnInit(): void {
    this.sportSections();
  }

  private sportSections() {
    this.sportSectionService
      .getSportSections()
      .subscribe((sections) => (this.sections = sections));
  }
}
