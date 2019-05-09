import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PeopleData, Person } from '../people.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  people : Person[] = [];

  constructor(private peopledata: PeopleData,
              private router: Router) {}
  
  ionViewDidLoad() {
	  this.people = this.peopledata.getAll();
  }
  
  ionViewDidEnter() {
      this.people = this.peopledata.getAll();	  
  }

  edit(nme:string) {
	  console.log("Editing: "+nme);
	  this.router.navigate(['/edit', { name: nme }]);
	  // this.people = this.peopledata.getAll();
  }
}
