import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private appUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.host;
    this.apiUrl = environment.apiGames;
  }

  getGameList(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.appUrl}${this.apiUrl}`);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  saveGame(game: Game): Observable<void> {
    return this.http.post<void>(`${this.appUrl}${this.apiUrl}`, game)
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  updateGame(id: number, game: Game): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}${id}`, game)
  }
}
