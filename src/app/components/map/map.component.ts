import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as leaflet from 'leaflet';
import { environment } from '../../../environments/environment';
import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { GeoResponse } from '../../interfaces/geo-response';
import { LoadingComponent } from "../../shared/loading/loading.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterModule, LoadingComponent],
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
    this.map = leaflet.map('map').setView([41.33, 2.15], 12);
    leaflet.tileLayer(environment.mapUrl).addTo(this.map);
  }

  getPos() {
    if (navigator.geolocation) {
      const icon = leaflet.icon({ iconUrl: './assets/marker-icon.png', iconSize: [25, 41] })

      navigator.geolocation.getCurrentPosition((position) => {
        const coords: [number, number] = [position.coords.latitude, position.coords.longitude];

        if (this.userMarker) this.userMarker = leaflet.marker(coords);
        else {
          this.userMarker = leaflet.marker(coords, { icon: icon, draggable: true }).addTo(this.map);
          this.userMarker.on('dragend', (event) => {
            const marker = event.target;
            const pos = marker.getLatLng();
            marker.setLatLng(pos).openPopup(
              this.map.setView(pos)
            )
          })
        }

        this.map.setView(coords, 12);
      }, () =>
        (console.error('Could not get location')))
    }
  }

  getCoords(players: Player[]) {
    players.forEach(player => {
      const city = player.city ? player.city : player.country;

      this._playerService.getPlayerCoords(city, player.country).subscribe((response: GeoResponse) => {
        player.lat = response.results[0].geometry.lat
        player.lon = response.results[0].geometry.lng
      })
    })

  }

}
