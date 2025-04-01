import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss'
})
export class GraphsComponent implements OnInit {
  ngOnInit(): void {
    this.renderAgeChart()
    this.renderMatchesChart()
  }

  renderAgeChart() {
    const chart = new Chart("age", {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: ['rgba(255, 39, 39, 0.7)', 'rgba(0, 110, 255, 0.7)', 'rgba(255, 238, 0, 0.7)', 'rgba(21, 255, 0, 0.7)', 'rgba(195, 0, 255, 0.7)', 'rgba(255, 115, 0, 0.7)'],
          borderWidth: 0,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderMatchesChart() {
    const chart = new Chart("matches", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: ['rgba(255, 39, 39, 0.7)', 'rgba(0, 110, 255, 0.7)', 'rgba(255, 238, 0, 0.7)', 'rgba(21, 255, 0, 0.7)', 'rgba(195, 0, 255, 0.7)', 'rgba(255, 115, 0, 0.7)'],
          borderWidth: 0,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
