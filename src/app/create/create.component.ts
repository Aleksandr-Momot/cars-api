import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OwnerService } from 'src/owner.service';
import { numberValidator } from '../car-number.validators';
import { IOwner } from '../owner';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  owner: IOwner;
  form: FormGroup;
  submitted = false;

  uSub: Subscription;
  constructor(
    private ownerService:OwnerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      carNumber: new FormControl('', [Validators.required,numberValidator()]),
      carName: new FormControl('', Validators.required),
      carModel: new FormControl('', Validators.required),
      carYear: new FormControl('', Validators.required),
    });
  }


  save(): void {
    this.ownerService.addOwner(this.owner).subscribe(() => {
      this.form.reset()
    });
    if(this.form.invalid) {
      return;
    }

    const owner: IOwner = {
      ...this.owner,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      middleName: this.form.value.middleName,
      cars: [
        {
          number:  this.form.value.carNumber,
          name:  this.form.value.carName,
          model:  this.form.value.carModel,
          year:  this.form.value.carYear,
          id: this.form.value.id
        }
      ]
    };

    this.ownerService.addOwner(owner).subscribe(() => {
      this.form.reset()
      this.router.navigate([''])
    });
  }

}
