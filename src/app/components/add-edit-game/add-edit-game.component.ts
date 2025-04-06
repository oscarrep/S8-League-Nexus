import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Game } from '../../interfaces/game';
import { GameService } from '../../services/game.service';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit',
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './add-edit-game.component.html',
  styleUrl: './add-edit-game.component.scss'
})
export class AddEditGameComponent implements OnInit {

  gameForm: FormGroup;
  loading: boolean = false;
  private fb = inject(FormBuilder);
  id: number;
  addEdit: string = 'Add';

  constructor(private _gameService: GameService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start: ['', Validators.required],
      end: [''],
      league: ['', Validators.required],
    })
    this.id = Number(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.addEdit = 'Edit';
      this.getGame(this.id);
    }
  }

  addGame() {
    const game: Game = {
      title: this.gameForm.value.title,
      description: this.gameForm.value.description,
      start: this.gameForm.value.start,
      end: this.gameForm.value.end,
      league: this.gameForm.value.league,
    }

    console.log(game)

    this.loading = true;

    if (this.id !== 0) {
      game.id = this.id;
      this._gameService.updateGame(this.id, game).subscribe(() => {
        this.toastr.info(`Game ${game.title} updated`, 'Game Updated');
        this.loading = false;
        this.router.navigate(['/calendar']);
      })
    }
    else {
      this._gameService.saveGame(game).subscribe(() => {
        this.toastr.success(`Game ${game.title} registered to database`, 'Game Registered');
        this.loading = false;
        this.router.navigate(['/calendar']);
      })
    }
  }

  getGame(id: number) {
    this.loading = true;
    this._gameService.getGame(id).subscribe((data: Game) => {
      console.log(data);

      const formattedStart = data.start ? this.toDatetimeLocal(data.start) : '';
      const formattedEnd = data.end ? this.toDatetimeLocal(data.end) : '';

      this.gameForm.setValue({
        title: data.title,
        description: data.description,
        start: formattedStart,
        end: formattedEnd,
        league: data.league,
      })
      this.loading = false;
    })
  }

  private toDatetimeLocal(dateStr: string): string {
    const date = new Date(dateStr);
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - tzOffset);
    return localDate.toISOString().slice(0, 16);
  }

}
