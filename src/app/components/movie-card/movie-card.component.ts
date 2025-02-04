import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../services/movie-recommender.service';

@Component({
  selector: 'app-movie-card',
  template: `
    <div class="movie-card">
      <img 
        *ngIf="movie.poster_path" 
        [src]="movie.poster_path" 
        [alt]="movie.title"
        class="movie-poster"
      >
      <div class="movie-details">
        <h3>{{ movie.title }}</h3>
        <p *ngIf="movie.release_date">
          Release Date: {{ movie.release_date | date:'mediumDate' }}
        </p>
        <p *ngIf="movie.vote_average">
          Rating: {{ movie.vote_average }}/10
        </p>
        <p *ngIf="movie.overview" class="movie-overview">
          {{ movie.overview | slice:0:150 }}...
        </p>
      </div>
    </div>
  `,
  styles: [`
    .movie-card {
      border: 1px solid #ddd;
      margin: 10px;
      padding: 10px;
      display: flex;
      max-width: 500px;
    }
    .movie-poster {
      max-width: 150px;
      margin-right: 15px;
    }
    .movie-details {
      flex-grow: 1;
    }
    .movie-overview {
      font-size: 0.9em;
      color: #666;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}