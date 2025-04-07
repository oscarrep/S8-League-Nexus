import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { GameService } from '../../services/game.service';
import { PlayerService } from '../../services/player.service';
Chart.register(...registerables);

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss'
})
export class GraphsComponent implements OnInit {
  constructor(private _gameService: GameService, private _playerService: PlayerService) { }

  ngOnInit(): void { this.loadCharts(); }

  loadCharts() {
    this.loadAgeChart();
    this.loadGamesChart();
  }

  loadAgeChart() {
    this._playerService.getPlayerList().subscribe(players => {
      const ageSlices: { [key: string]: number } = {
        '<18': 0,
        '18-20': 0,
        '21-23': 0,
        '24-26': 0,
        '27-29': 0,
        '30+': 0,
      };

      players.forEach(player => {
        const age = parseInt(player.age);
        if (age < 18) ageSlices['<18']++;
        else if (age <= 20) ageSlices['18-20']++;
        else if (age <= 23) ageSlices['21-23']++;
        else if (age <= 26) ageSlices['24-26']++;
        else if (age <= 29) ageSlices['27-29']++;
        else ageSlices['30+']++;
      });

      this.renderAgeChart(Object.keys(ageSlices), Object.values(ageSlices));
    });
  }

  renderAgeChart(labels: string[], data: number[]) {
    new Chart('age', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Players',
            data,
            backgroundColor: ['rgba(255, 39, 39, 0.7)', 'rgba(0, 110, 255, 0.7)', 'rgba(255, 238, 0, 0.7)', 'rgba(21, 255, 0, 0.7)', 'rgba(195, 0, 255, 0.7)', 'rgba(255, 115, 0, 0.7)'],
            borderWidth: 0,
          },
        ],
      },
    });
  }

  loadGamesChart() {
    this._gameService.getGameList().subscribe(games => {
      const monthBars: { [key: string]: number } = {};

      games.forEach(game => {
        const date = new Date(game.start);
        const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        monthBars[month] = (monthBars[month] || 0) + 1;
      });

      const sortedMonths = Object.keys(monthBars).sort((monthA, monthB) => {
        return new Date(monthA).getTime() - new Date(monthB).getTime();
      });

      const gamesCount = sortedMonths.map(month => monthBars[month]);

      this.renderMatchesChart(sortedMonths, gamesCount);
    });
  }

  renderMatchesChart(labels: string[], data: number[]) {
    new Chart('matches', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Games',
            data,
            backgroundColor: 'rgba(0, 110, 255, 0.7)',
            borderWidth: 0,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}
