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
      location: ['', Validators.required],
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
      location: this.gameForm.value.location,
    }

    console.log(game)

    this.loading = true;

    if (this.id !== 0) {
      game.id = this.id;
      this._gameService.updateGame(this.id, game).subscribe(() => {
        this.toastr.info(`Game ${game.title} updated`, 'Game Updated');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }
    else {
      this._gameService.saveGame(game).subscribe(() => {
        this.toastr.success(`Game ${game.title} registered to database`, 'Game Registered');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }
  }

  getGame(id: number) {
    this.loading = true;
    this._gameService.getGame(id).subscribe((data: Game) => {
      console.log(data);
      this.gameForm.setValue({
        tilte: data.title,
        decription: data.description,
        start: data.start,
        end: data.end,
        location: data.location,
      })
      this.loading = false;
    })
  }

}
