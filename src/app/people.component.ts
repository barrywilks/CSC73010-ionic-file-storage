import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';


export interface Person {
	name:string;
	age: number;
}

@Injectable()
export class PeopleData {
	
    private filename:string = "people.json";  // persistent data file name
	people: Person[];					      // the internal database
	
	constructor ( private fileSystem:File) {
		this.loadData();					  // initiate the data load from the file
	}
	
	
	public getAll() : Person[] {
		return this.people;
	}
	
	// get record by name
	public getPerson(name:string): Person {
		let ind = this.findname(name);
		if (ind<0)
			return null;
		else
			return this.people[ind];
	}
	
	//
	//  addPerson(p:Person)
	//
	//  Fail if person already exists
	//
	public addPerson(p:Person): boolean {
		if (this.findname(p.name) >= 0)
			return false;			// already exists
		else {
			this.people.push(p);	// add to end of array
			this.saveData();		// save to file
			return true;
		}
	}
	
	//
	//  updatePerson(p:Person)
	//  
	//  p must have name attribute existing or we fail
	//
	public updatePerson(p: Person) : boolean {
		let pno:number = this.findname(p.name);
		if (pno < 0) {
			return false;  		   // does not exist
		} else {
			this.people[pno] = p;
			this.saveData();	   // save to file
		}
		return true;
	}
	
	//
	//  removePerson(p:string)
	//
	//  fail if person does not exist
	//
	public removePerson(name:string) : boolean {
		let pno:number = this.findname(name);
		if (pno < 0) {
			return false;  				// does not exist
		} else {
			this.people.splice(pno,1);	// remove this array entry
			this.saveData();			// save to file
			return true;
		}
	}
	
	//find index of name
	private findname(name:string):number {
		for (let i=0; i<this.people.length; i++) {
			if (this.people[i].name == name) {
				return i;
			}
		}
		return -1;
	}
	
	//
	// load data from our persistent store
	//
	loadData() {
		console.log(JSON.stringify(this.fileSystem));
		this.fileSystem
            .readAsText(this.fileSystem.dataDirectory, this.filename)
            .then(
               (txt) => { 	// file exists - probably from previous install
				   console.log("read OK:"+txt);
                   this.people=JSON.parse(txt);
	            },
			   (err) => {  // assume file does not exist
				   console.log("Creating new file");
				   this.fileSystem
				       .writeFile(this.fileSystem.dataDirectory, this.filename,
					       "[]",	// empty array
						   {replace:true}
					       )
						.then (
						    (fe) => {},
							(err) => { console.log("File create error:"+err);}
						);
				   this.people = [];
			   });
	    }
	
	//
	// save data to persistent store
	// 
	// we call this whenever people data changes
	//
	saveData() {
		let jtext:string = JSON.stringify(this.people);
		this.fileSystem
		    .writeFile(this.fileSystem.dataDirectory,
				this.filename,
				jtext,
				{replace:true}
				)
			.then (
				(fe) => {},
			    (err) => {console.log("Error writing to file");}
			    );
		}
}

