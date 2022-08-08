import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  private URL =
    'https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts';

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      id: new FormControl(''),
    });

    this._http.get(this.URL).subscribe((res) => {
      this.contacts = res as any[];
    });
  }

  save(): void {
    if (this.isAdd) {
      this.contacts.push({
        ...this.contactForm.value,
        ...{ id: this.contacts[this.contacts.length - 1].id + 1 },
      });
    } else {
      this.contacts.map((item) => {
        if (item.id === this.contactForm.value.id) {
          Object.assign(item, this.contactForm.value);
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
    this.contactForm.setValue(item);
  }
  delete(id: number): void {
    const index = this.contacts.findIndex((item) => item.id === id);
    this.contacts.splice(index, 1);
  }
}
