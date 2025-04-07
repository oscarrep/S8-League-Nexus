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
  loading: boolean = false;
  private fb = inject(FormBuilder);
  //id: number;
  addEdit: string = 'Add';
  @Input() gameSig!: Signal<Game | null>;

  constructor(private _gameService: GameService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start: ['', Validators.required],
      end: [''],
      league: ['', Validators.required],
    })
    //this.id = Number(route.snapshot.paramMap.get('id'));
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
      start: this.gameForm.value.start,
      end: this.gameForm.value.end,
      league: this.gameForm.value.league,
    }

    console.log(game)


    if (this.gameSig && this.gameSig()?.id) {
      game.id = this.gameSig()!.id;
      this._gameService.updateGame(game.id, game).subscribe(() => {
        this.toastr.info(`Game ${game.title} updated`, 'Game Updated');
        this.loading = false;
        this.router.navigate(['/calendar']);
      });
    } else {
      this._gameService.saveGame(game).subscribe(() => {
        this.toastr.success(`Game ${game.title} registered to database`, 'Game Registered');
        this.loading = false;
        this.router.navigate(['/calendar']);
      });
    }
  }

  parseGame(game:Game) {
    this.gameForm.patchValue({
      title: game.title,
      description: game.description || '',
      start: this._gameService.toDatetimeLocal(game.start),
      end: game.end ? this._gameService.toDatetimeLocal(game.end) : '',
      league: game.league || '',
    });
  }

}
