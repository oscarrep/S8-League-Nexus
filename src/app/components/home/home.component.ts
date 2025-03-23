import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayerListComponent } from "../player-list/player-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, PlayerListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
