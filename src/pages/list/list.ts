import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PeopleData } from '../../app/people.component';
import { Person } from '../../app/person';

import { EditPage } from '../edit/edit';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  people : Person[] = [];

  constructor(public navCtrl: NavController ,
			  private peopledata: PeopleData) {

  }
  
  ionViewDidLoad() {
	  if (this.peopledata.loading) {
		  setTimeout(
	         () => {this.people = this.peopledata.getAll()},
	         500	// half second wait
	        );
	  } else {
		this.people = this.peopledata.getAll();
	  }
  }
  
  ionViewDidEnter() {
      this.people = this.peopledata.getAll();	  
  }

  edit(nme:string) {
	  console.log("Editing: "+nme);
	  this.navCtrl.push(EditPage, { name: nme } );
	  this.people = this.peopledata.getAll();
  }
  
}
