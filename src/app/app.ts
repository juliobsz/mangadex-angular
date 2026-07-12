import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  mangas$: Observable<Manga[]> = fetchManga(this.http);
}

function fetchManga(http: HttpClient): Observable<Manga[]> {
  return http.get<Manga[]>(`${environment.apiUrl}/mangas`).pipe(
    map(mangas =>
      [...mangas].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      ).slice(0, 4)
    )
  )
}
