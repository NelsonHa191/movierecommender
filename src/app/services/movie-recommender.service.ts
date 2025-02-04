import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Movie {
  tmdb_id: number;
  title: string;
  release_date?: string;
  overview?: string;
  poster_path?: string;
  vote_average?: number;
  popularity?: number;
  genres?: string[];
  cast?: string[];
  director?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieRecommenderService {
  private apiKey = environment.tmdbApiKey;
  private baseUrl = 'https://api.themoviedb.org/3';
  private imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private httpClient: HttpClient) { }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  searchMovies(query: string): Observable<Movie[]> {
    const url = `${this.baseUrl}/search/movie`;
    return this.httpClient.get<any>(url, {
      params: {
        api_key: this.apiKey,
        query: query,
        include_adult: 'false'
      }
    }).pipe(
      map(response => response.results.map((movie: any) => ({
        tmdb_id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        poster_path: movie.poster_path ? `${this.imageBaseUrl}${movie.poster_path}` : null,
        vote_average: movie.vote_average,
        popularity: movie.popularity
      })))
    );
  }

  getHybridRecommendations(movieId: number): Observable<Movie[]> {
    const url = `${this.baseUrl}/movie/${movieId}/recommendations`;
    return this.httpClient.get<any>(url, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      map(response => response.results.map((movie: any) => ({
        tmdb_id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        poster_path: movie.poster_path ? `${this.imageBaseUrl}${movie.poster_path}` : null,
        vote_average: movie.vote_average,
        popularity: movie.popularity
      })))
    );
  }

  getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Observable<Movie[]> {
    const url = `${this.baseUrl}/trending/movie/${timeWindow}`;
    return this.httpClient.get<any>(url, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      map(response => response.results.map((movie: any) => ({
        tmdb_id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        overview: movie.overview,
        poster_path: movie.poster_path ? `${this.imageBaseUrl}${movie.poster_path}` : null,
        vote_average: movie.vote_average,
        popularity: movie.popularity
      })))
    );
  }
}