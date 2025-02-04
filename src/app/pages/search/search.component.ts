import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieRecommenderService, Movie } from '../../services/movie-recommender.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-search',
  template: `
    <div class="container">
      <h2>Movie Recommender</h2>

      <div class="trending-section">
        <h3>Trending Movies</h3>
        <div class="movies-grid">
          <div 
            *ngFor="let movie of trendingMovies" 
            (click)="selectMovie(movie)"
            class="movie-item"
          >
            <app-movie-card [movie]="movie"></app-movie-card>
          </div>
        </div>
      </div>

      <div class="search-section">
        <div class="search-input">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            placeholder="Search for a movie"
            (input)="onSearchInput()"
          >
          <button (click)="searchMovies()">Search</button>
        </div>

        <div *ngIf="searchResults.length" class="search-results">
          <h3>Search Results</h3>
          <div class="movies-grid">
            <div 
              *ngFor="let movie of searchResults" 
              (click)="selectMovie(movie)"
              class="movie-item"
            >
              <app-movie-card [movie]="movie"></app-movie-card>
            </div>
          </div>
        </div>

        <div *ngIf="selectedMovie" class="selected-movie-section">
          <h3>Selected Movie</h3>
          <div class="selected-movie-container">
            <app-movie-card [movie]="selectedMovie"></app-movie-card>
            
            <div *ngIf="recommendations.length" class="recommendations-section">
              <h4>Recommended Movies</h4>
              <div class="movies-grid">
                <div 
                  *ngFor="let movie of recommendations" 
                  (click)="selectMovie(movie)"
                  class="movie-item"
                >
                  <app-movie-card [movie]="movie"></app-movie-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  <!-- This is the correct closing tag for "search-section" -->
    </div>
  `,

  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .search-input {
      display: flex;
      margin-bottom: 20px;
    }
    .search-input input {
      flex-grow: 1;
      margin-right: 10px;
      padding: 5px;
    }
    .movies-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
    }
    .movie-item {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .movie-item:hover {
      transform: scale(1.05);
    }
    .selected-movie-section {
      margin-top: 20px;
    }
    .recommendations-section {
      margin-top: 20px;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }
    .selected-movie-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent]
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchResults: Movie[] = [];
  trendingMovies: Movie[] = [];
  selectedMovie: Movie | null = null;
  recommendations: Movie[] = [];

  constructor(private movieService: MovieRecommenderService) {}

  ngOnInit() {
    // Load trending movies when component initializes
    this.loadTrendingMovies();
  }

  loadTrendingMovies() {
      this.movieService.getTrendingMovies()
        .subscribe(movies => {
          this.trendingMovies = movies;
        });
  }

  onSearchInput() {
    // Clear search results and selected movie if search input is empty
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      this.selectedMovie = null;
      this.recommendations = [];
    }
  }

  searchMovies() {
    if (this.searchQuery) {
      this.movieService.searchMovies(this.searchQuery)
        .subscribe(movies => {
          this.searchResults = movies;
          this.selectedMovie = null;
          this.recommendations = [];
        });
    }
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.searchQuery = ''; // Clear search input
    this.searchResults = []; // Clear search results

    // Get recommendations for the selected movie
    this.movieService.getHybridRecommendations(movie.tmdb_id)
      .subscribe(recommendations => {
        this.recommendations = recommendations;
      });
  }
}