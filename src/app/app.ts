import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { environment } from '../environments/environment';

interface Manga {
  id: number;
  name: string;
  mangadex_id: string;
  cover: string;
  url: string;
  status: string;
  favorite: boolean;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, NgOptimizedImage],
  templateUrl: './app.html',
  standalone: true
})

export class App {
  private http = inject(HttpClient);

  favorites$: Observable<Manga[]> = fetchFavorites(this.http);
  recents$: Observable<Manga[]> = fetchRecents(this.http);
}

function fetchFavorites(http: HttpClient): Observable<Manga[]> {
  return http.get<Manga[]>(`${environment.apiUrl}/favorites`);
}

function fetchRecents(http: HttpClient): Observable<Manga[]> {
  return http.get<Manga[]>(`${environment.apiUrl}/recents`);
}
