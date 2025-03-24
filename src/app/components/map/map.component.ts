import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  private map: any;
  private userMarker: leaflet.Marker<any> | undefined;

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = leaflet.map('map').setView([41.33, 2.15], 12);
    leaflet.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png').addTo(this.map);
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

}
