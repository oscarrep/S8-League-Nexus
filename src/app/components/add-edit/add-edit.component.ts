import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { routes } from '../../app.routes';
import { Toast, ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-edit',
  imports: [RouterModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent implements OnInit {

  playersForm: FormGroup;
  loading: boolean = false;
  private fb = inject(FormBuilder);
  id: number;
  addEdit: string = 'Add';

  constructor(private _playerService: PlayerService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) {
    this.playersForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      team: ['', Validators.required],
      team_short: ['', Validators.required],
      position: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
    })
    this.id = Number(route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) this.addEdit = 'Edit';
    this.getPlayer(this.id)
  }


  addPlayer() {
    const player: Player = {
      username: this.playersForm.value.username,
      name: this.playersForm.value.name,
      team: this.playersForm.value.team,
      team_short: this.playersForm.value.team_short,
      position: this.playersForm.value.position,
      age: this.playersForm.value.age,
      country: this.playersForm.value.country,
      city: this.playersForm.value.city,
    }

    this.loading = true;
    this._playerService.savePlayer(player).subscribe(() => {
      console.log('added player');
      this.loading = false;
      this.toastr.success(`${player.name} registered to database`, 'Player Registered')
      this.router.navigate(['/'])
    })
  }

  getPlayer(id: number) {
    this.loading = true;
    this._playerService.getPlayer(id).subscribe((data: Player) => {
      console.log(data);
      this.playersForm.setValue({
        username: data.username,
        name: data.name,
        team: data.team,
        team_short: data.team_short,
        position: data.position,
        age: data.age,
        country: data.country,
        city: data.city,
      })
      this.loading = false;
    })
  }

}
