import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { PeopleData, Person } from '../../app/people.component';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {
  paramName:string;
  name:string="";
  age:number =0;

  constructor(public navCtrl: NavController,
			  public params: NavParams,
              private alert: AlertController,
			  private people: PeopleData) {
	    this.name = params.get('name');
		console.log("Constructor name:"+this.name)
		let p: Person = people.getPerson(this.name);
		this.age = p.age;
	}

  doSave() {
	if (this.people.updatePerson({name: this.name, age: this.age})) {
		this.navCtrl.pop();
	} else {
 	    let alt = this.alert.create(
		        {title: 'Updating error',
		         subTitle: 'An error was encountered trying to update person',
		         buttons: ['OK'] }
		        );
           alt.present();				
		}
	}
  
  doCancel() {
	this.navCtrl.pop();
  }
  
  doDelete() {
    let alt = this.alert.create(
		        {title: 'Warning!',
		         subTitle: 'Do you really want to delete '+this.name,
		         buttons: [
				   {text:'OK',
				   handler: () => {
					  this.people.removePerson(this.name); 
					  this.navCtrl.pop();
				      }
				   },
				   {text:'Cancel',
				    role: 'cancel'
				   }]}
		        );
           alt.present();	 
  }
}
