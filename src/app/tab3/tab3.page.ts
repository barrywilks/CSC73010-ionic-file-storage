import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PeopleData, Person } from '../people.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  paramName:string;
  name:string="";
  age:number =0;

  constructor(private alert: AlertController,
			  private people: PeopleData) {
	}

  async doSave() {	
	 if (this.name=='') {
		let alt = await this.alert.create(
		   {header: 'No Name',
		    subHeader: 'You must enter a name',
		    buttons: ['OK'] }
		   );
		await alt.present();
	 } else {
	    let p: Person = {name: this.name, age: this.age};
	    if (this.people.addPerson(p)) {
           this.name='';
	       this.age=0;
		} else {
		   let alt = await this.alert.create(
		        {header: 'Already Exists',
		         subHeader: 'The name you have used already exists',
		         buttons: ['OK'] }
		        );
           await alt.present();				
		}
	 }
  }
  
  doCancel() {
		this.name='';
		this.age=0;
  }	
	
}
