import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { numberValidator } from '../car-number.validators';
import { ICar } from '../owner';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  form: FormGroup;
  @Input() car: ICar = null;
  @Output() formChanged = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      carNumber: new FormControl(this.car.number, [Validators.required, numberValidator()]),
      carName: new FormControl(this.car.name, Validators.required),
      carModel: new FormControl(this.car.model, Validators.required),
      carYear: new FormControl(this.car.year, Validators.required),
    })
    this.form.statusChanges.subscribe(
      _ => {
        const t = this.form.value;
        t.id = this.car.id;
        this.formChanged.emit(t);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      console.log(this.car);
    }
  }

}
