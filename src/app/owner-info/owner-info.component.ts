import { OwnerService } from './../../owner.service';
import { IOwner } from './../owner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss']
})

export class OwnerInfoComponent implements OnInit {
  owner: IOwner;
  ownerClone: IOwner;
  form: FormGroup;
  submitted = false;
  carForm: FormGroup;

  isAvalible = false;
  uSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private ownerService: OwnerService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOwnerById();
  }

  carChanged(event) {
    console.log(event);
    let changedCarValue = event;
    if (this.ownerClone.cars.find(car => car.id === changedCarValue.id)) {
      let carT = this.ownerClone.cars.find(car => car.id === changedCarValue.id);
      carT.model = changedCarValue.carModel;
      carT.name = changedCarValue.carName;
      carT.number = changedCarValue.carNumber;
      carT.year = changedCarValue.carYear;
    }
  }

  getOwnerById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.ownerService.getOwnerById(id)
      .subscribe((owner: IOwner) => {
        this.owner = owner;
        let OStr = JSON.stringify(this.owner);
        this.ownerClone = JSON.parse(OStr);
        this.form = new FormGroup({
            firstName: new FormControl(this.owner.firstName, Validators.required),
            lastName: new FormControl(this.owner.lastName, Validators.required),
            middleName: new FormControl(this.owner.middleName, Validators.required),
        });
      });
  }

  goBack(): void {
    this.location.back();
  }

  reload() {
    let OStr = JSON.stringify(this.ownerClone);
    this.owner = JSON.parse(OStr);
    this.save();
    this.goBack();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.ownerClone.firstName = this.form.value.firstName;
    this.ownerClone.lastName = this.form.value.lastName;
    this.ownerClone.middleName = this.form.value.middleName;
    this.uSub = this.ownerService.updateOwner(this.ownerClone).subscribe(() => {
      this.submitted = false;
      this.router.navigate(['']);
    });
  }
}
