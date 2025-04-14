import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Game } from '../../interfaces/game';
import { GameService } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-game',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-game.component.html',
  styleUrl: './add-edit-game.component.scss'
})
export class AddEditGameComponent implements OnInit {

  gameForm: FormGroup;
  private fb = inject(FormBuilder);
  //id: number;
  addEdit: string = 'Add';
  @Input() gameSig!: Signal<Game | null>;

  constructor(private _gameService: GameService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start_date: ['', Validators.required],
      end_date: [''],
      league: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const game = this.gameSig?.();

    if (game) {
      this.addEdit = 'Edit';
      this.parseGame(game);
    }
  }

  addGame() {
    const game: Game = {
      title: this.gameForm.value.title,
      description: this.gameForm.value.description,
      start_date: this.gameForm.value.start_date,
      end_date: this.gameForm.value.end_date,
      league: this.gameForm.value.league,
    }

    console.log(game)


    if (this.gameSig && this.gameSig()?.id) {
      game.id = this.gameSig()!.id;
      this._gameService.updateGame(game.id, game).subscribe(() => {
        this.toastr.info(`Game ${game.title} updated`, 'Game Updated');
        this.router.navigate(['/calendar']);
      });
    } else {
      this._gameService.saveGame(game).subscribe(() => {
        this.toastr.success(`Game ${game.title} registered to database`, 'Game Registered');
        this.router.navigate(['/calendar']);
      });
    }
  }

  parseGame(game:Game) {
    this.gameForm.patchValue({
      title: game.title,
      description: game.description || '',
      start: this._gameService.toDatetimeLocal(game.start_date),
      end: game.end_date ? this._gameService.toDatetimeLocal(game.end_date) : '',
      league: game.league || '',
    });
  }

}
