import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PeopleData, Person } from '../../app/people.component';

@Component({
  selector: 'page-new',
  templateUrl: 'new.html'
})
export class NewPage {
  paramName:string;
  name:string="";
  age:number =0;

  constructor(public navCtrl: NavController,
              private alert: AlertController,
			  private people: PeopleData) {
	}

  doSave() {
	 if (this.name=='') {
		let alt = this.alert.create(
		   {title: 'No Name',
		    subTitle: 'You must enter a name',
		    buttons: ['OK'] }
		   );
		alt.present();
	 } else {
	    let p: Person = {name: this.name, age: this.age};
	    if (this.people.addPerson(p)) {
           this.name='';
	       this.age=0;
		} else {
		   let alt = this.alert.create(
		        {title: 'Already Exists',
		         subTitle: 'The name you have used already exists',
		         buttons: ['OK'] }
		        );
           alt.present();				
		}
	 }
  }
  
  doCancel() {
		this.name='';
		this.age=0;
  }
}
