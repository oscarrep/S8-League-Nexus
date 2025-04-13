import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as leaflet from 'leaflet';
import { environment } from '../../../environments/environment';
import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { GeoResponse } from '../../interfaces/geo-response';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  private map: any;
  private userMarker: leaflet.Marker<any> | undefined;
  playerList: Player[] = [];


  constructor(private _playerService: PlayerService) { }

  ngOnInit(): void {
    this._playerService.getPlayerList().subscribe((data: Player[]) => {
      console.log(data);
      this.playerList = data;
      this.getCoords(this.playerList);
      this.initMap();
    });
  }

  private initMap() {
    if (this.map) this.map.remove();
    
    this.map = leaflet.map('map').setView([43.33, 2.15], 4.5);
    leaflet.tileLayer(environment.mapUrl).addTo(this.map);
  }

  setPlayerMarker(player: Player) {
    if (typeof player.lat !== 'number' || typeof player.lon !== 'number' || isNaN(player.lat) || isNaN(player.lon)) {
      console.error(`Invalid coordinates for ${player.username}`);
      return;
    }

    const icon = leaflet.icon({ iconUrl: './assets/marker-icon.png', iconSize: [25, 41] })

    if (navigator.geolocation) {
      const coords: [number, number] = [player.lat, player.lon];
      const marker = leaflet.marker(coords, { icon: icon, draggable: false }).addTo(this.map);
      marker.bindPopup(`<b>${player.username}</b><br>${player.city || player.country}`);
    }
  }

  getCoords(players: Player[]) {
    players.forEach(player => {
      const city = player.city ? player.city : player.country;

      this._playerService.getPlayerCoords(city, player.country).subscribe((response: GeoResponse) => {
        if (response.results.length > 0) {
          player.lat = response.results[0].geometry.lat;
          player.lon = response.results[0].geometry.lng;

          this.setPlayerMarker(player);
        }
        else console.error(`No valid coordinates found for ${player.username}`);

      });
    });
  }
}
