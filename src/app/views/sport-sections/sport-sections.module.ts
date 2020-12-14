import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CompetitionComponent } from './components/competition/competition.component';
import { ContestantComponent } from './components/contestant/contestant.component';
import { SectionComponent } from './components/sport-section-list/section/section.component';
import { SportSectionListComponent } from './components/sport-section-list/sport-section-list.component';
import { CompetitionService } from './services/competition.service';
import { ContestantService } from './services/contestant.service';
import { MenuService } from './services/menu.service';
import { SportSectionService } from './services/sport-section.service';
import { SportSectionsRoutingModule } from './sport-sections-routing.module';
import { SportSectionsComponent } from './sport-sections.component';

@NgModule({
  declarations: [
    SportSectionsComponent,
    ContestantComponent,
    CompetitionComponent,
    SportSectionListComponent,
    SectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SportSectionsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    NgxSpinnerModule,
  ],
  providers: [
    SportSectionService,
    CompetitionService,
    ContestantService,
    MenuService,
  ],
})
export class SportSectionsModule {}
