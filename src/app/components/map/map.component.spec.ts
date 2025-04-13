import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as leaflet from 'leaflet';
import { of } from 'rxjs';
import { MapComponent } from './map.component';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../interfaces/player';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let playerServiceMock: any;

  beforeEach(async () => {
    playerServiceMock = {
      getPlayerList: jasmine.createSpy('getPlayerList').and.returnValue(of([
        { username: 'Player1', city: 'City1', country: 'Country1', lat: NaN, lon: NaN },
        { username: 'Player2', city: 'City2', country: 'Country2', lat: null, lon: null }
      ])),
      getPlayerCoords: jasmine.createSpy('getPlayerCoords').and.callFake((city: string, country: string) => {
        if (city === 'City1') return of({ results: [{ geometry: { lat: 10, lng: 20 } }] });
        else if (city === 'City2') return of({ results: [{ geometry: { lat: 30, lng: 40 } }] });
        else if (city === 'City3') return of({ results: [] });
        return of({ results: [] });
      })
    };

    await TestBed.configureTestingModule({
      imports: [MapComponent],
      providers: [
        { provide: PlayerService, useValue: playerServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the map', () => {
    const mapSpy = spyOn(leaflet, 'map').and.callThrough();
    component.ngOnInit();
    expect(mapSpy).toHaveBeenCalledWith('map');
  });

  it('should set markers for players with valid coordinates', () => {
    const markerSpy = spyOn(leaflet, 'marker').and.callThrough();
    const players: Player[] = [
      {
        username: 'Player1', city: 'City1', country: 'Country1', lat: 10, lon: 20,
        name: 'Name1',
        position: 'Top Lane',
        age: '21',
        team: 'ABCDE',
        team_short: 'ABC'
      },
      {
        username: 'Player2', city: 'City2', country: 'Country2', lat: 30, lon: 40,
        name: 'NAME"',
        position: 'Jungle',
        age: '22',
        team: 'FGHIJ',
        team_short: 'FGH'
      }
    ];

    component.getCoords(players);

    expect(markerSpy).toHaveBeenCalledTimes(2);
    expect(markerSpy).toHaveBeenCalledWith([10, 20], jasmine.any(Object));
    expect(markerSpy).toHaveBeenCalledWith([30, 40], jasmine.any(Object));
  });

  it('should not set markers for players without valid coordinates', () => {
    const markerSpy = spyOn(leaflet, 'marker').and.callThrough();
    const players: Player[] = [
      {
        username: 'Player3', city: 'City3', country: 'Country3', lat: NaN, lon: NaN,
        name: 'Name3',
        position: 'Mid Lane',
        age: '23',
        team: '12345',
        team_short: '123'
      },
      {
        username: 'Player2', city: 'City2', country: 'Country2', lat: 30, lon: 40,
        name: 'Name2',
        position: 'Jungle',
        age: '22',
        team: 'FGHIJ',
        team_short: 'FGH'
      }
    ];

    component.getCoords(players);

    expect(markerSpy).toHaveBeenCalledTimes(1);
    expect(markerSpy).toHaveBeenCalledWith([30, 40], jasmine.any(Object));
  });
});
