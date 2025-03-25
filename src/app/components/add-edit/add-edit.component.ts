import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-add-edit',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss'
})
export class AddEditComponent {

  playersForm: FormGroup;

  private fb = inject(FormBuilder)

  constructor() {
    this.playersForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      team: ['', Validators.required],
      position: ['', Validators.required],
      age: ['', Validators.required],
      nationality: ['', Validators.required],
      city: ['', Validators.required],
    })
  }


  addPlayer() {
    /* const player: Player = {

    } */
  }

}
