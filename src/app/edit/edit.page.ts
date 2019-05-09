import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PeopleData, Person } from '../people.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
   
  name:string;
  age:number;

  constructor(private route:ActivatedRoute,
              private router: Router,
              private alert: AlertController,
			  private people: PeopleData) { }

  ngOnInit() {
	 this.route.params.subscribe(
	    (data) => { this.name = data.name;
		            let p:Person = this.people.getPerson(this.name);
					this.age=p.age;
					}
		);
  }
  
  async doSave() {
	    if (!this.people.updatePerson({name: this.name, age: this.age})) {
		    let alt = await this.alert.create(
		        {header: 'Updating error',
		         subHeader: 'An error was encountered trying to update person',
		         buttons: ['OK'] }
		        );
           await alt.present();				
		}
	    this.router.navigate(['/tabs/list']);
	}
  
  doCancel() {
	this.router.navigate(['/tabs/list']);
  }
  
  async doDelete() {
    let alt = await this.alert.create(
		        {header: 'Warning!',
		         subHeader: 'Do you really want to delete '+this.name,
		         buttons: [
				   {text:'OK',
				   handler: () => {
					  this.people.removePerson(this.name); 
				      }
				   },
				   {text:'Cancel',
				    role: 'cancel'
				   }]}
		        );
    await alt.present();
	this.router.navigate(['/tabs/list']);
  }
  

}
