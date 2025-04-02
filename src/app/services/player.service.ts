import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private appUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.appUrl = environment.host;
    this.apiUrl = environment.apiPlayers;
  }

  getPlayerList(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.appUrl}${this.apiUrl}`);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  savePlayer(player: Player): Observable<void> {
    return this.http.post<void>(`${this.appUrl}${this.apiUrl}`, player)
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.appUrl}${this.apiUrl}${id}`)
  }

  updatePlayer(id: number, player: Player): Observable<void> {
    return this.http.put<void>(`${this.appUrl}${this.apiUrl}${id}`, player)
  }
}
