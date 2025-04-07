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
  private lolEsportsUrl: string;
  private english: string;
  private spanish: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.host;
    this.apiUrl = environment.apiGames;
    this.lolEsportsUrl = environment.lolEsports;
    this.english = environment.localeEn;
    this.spanish = environment.localeEsp;
  }

  getGameList(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.appUrl}${this.apiUrl}`);
  }

  deleteGame(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  saveGame(game: Game): Observable<void> {
    return this.http.post<void>(`${this.appUrl}${this.apiUrl}`, game)
  }

  getGame(id: number | undefined): Observable<Game> {
    return this.http.get<Game>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  updateGame(id: number | undefined, game: Game): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}${id}`, game)
  }

  toDatetimeLocal(dateStr?: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const timeZoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timeZoneOffset);
    return localDate.toISOString().slice(0, 16);
  }

  getLeagues(): Observable<any> {
    return this.http.get<any>(`${this.lolEsportsUrl}/getLeagues${this.english}`);
  }
  getLeagueSchedule(id: string): Observable<any> {
    return this.http.get<any>(`${this.lolEsportsUrl}/getSchedule${this.english}&leagueId=${id}`);
  }
}
