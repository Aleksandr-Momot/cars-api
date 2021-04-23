import { OwnerService } from './../../owner.service';
import { IOwner } from './../owner';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  owners: IOwner[] = [];
  pSub: Subscription;
  dSub: Subscription;

  constructor(
    private ownerService:OwnerService
    ) { }

  displayedColumns: string[] = ['firstName', 'lastName', 'middleName', 'cars', 'action'];

  ngOnInit() {
    this.pSub = this.ownerService.getOwners().subscribe(owners => {
      this.owners = owners;
    });
  }

  delete(id: number) {
    this.dSub = this.ownerService.deleteOwner(id).subscribe(() => {
      this.owners = this.owners.filter(owner => owner.id !== id);
    });
  }
}
