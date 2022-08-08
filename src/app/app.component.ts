import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Encora';
  isAdd = false;
  contactForm: FormGroup;
  contacts: any[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // form initialization
    this.contactForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      id: new FormControl(''),
    });

    // calling service method to fetch contacts
    this.contactService.getContacts().subscribe(
      (res) => {
        this.contacts = res; // mapping response to local variable
      },
      (err) => {
        console.error('Error in fetching contacts.');
      }
    );
  }

  // local methods
  save(): void {
    if (this.isAdd) {
      this.contacts.push({
        ...this.contactForm.value, // Form data
        ...{ id: this.contacts[this.contacts.length - 1].id + 1 }, // appending id
      });
    } else {
      this.contacts.map((item) => {
        if (item.id === this.contactForm.value.id) {
          Object.assign(item, this.contactForm.value); // overriding object with updated data before returing it
        }
      });
    }
  }
  add(): void {
    this.contactForm.reset();
    this.isAdd = true;
  }
  edit(item: any): void {
    this.isAdd = false;
    this.contactForm.setValue(item); // for pre-popualating form data
  }
  delete(id: number): void {
    const index = this.contacts.findIndex((item) => item.id === id); // find index of the item for deletion
    this.contacts.splice(index, 1); // removing it from the list with index
  }
}
