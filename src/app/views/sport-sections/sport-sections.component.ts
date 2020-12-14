import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-sport-sections',
  templateUrl: './sport-sections.component.html',
  styleUrls: ['./sport-sections.component.scss'],
})
export class SportSectionsComponent {
  navigation: Observable<{
    sport: { icon: string; title: string };
    country: { icon: string; title: string };
  }>;
  constructor(private menu: MenuService, private router: Router) {
    this.navigation = this.menu.navigationData$;
  }

  redirectToHome(): void {
    this.menu.clearNavigationData();
    this.router.navigate(['/']);
  }
}
