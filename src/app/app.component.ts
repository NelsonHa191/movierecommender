import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [SearchComponent, RouterOutlet, RouterModule]
})
export class AppComponent {
  title = 'movie-recommender';
}