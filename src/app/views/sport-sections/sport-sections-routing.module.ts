import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompetitionComponent } from './components/competition/competition.component';
import { ContestantComponent } from './components/contestant/contestant.component';
import { SportSectionListComponent } from './components/sport-section-list/sport-section-list.component';
import { SportSectionsComponent } from './sport-sections.component';
import { SectionComponent } from './components/sport-section-list/section/section.component';

export const sportSectionRoutes: Routes = [
  {
    path: '',
    component: SportSectionsComponent,
    children: [
      { path: '', component: SportSectionListComponent },
      { path: ':name', component: SectionComponent },
      { path: 'competition/:id', component: CompetitionComponent },
      { path: 'contestant/:id', component: ContestantComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sportSectionRoutes)],
  exports: [RouterModule],
})
export class SportSectionsRoutingModule {}
