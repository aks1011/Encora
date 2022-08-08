import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { ContactService } from './contact.service';

const mockResponse = [
  {
    firstName: 'Amit',
    lastName: 'Roy',
    phone: '9876543210',
    id: 1,
  },
  {
    firstName: 'Aakash',
    lastName: 'Choudhury',
    phone: '9876584431',
    id: 2,
  },
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: ContactService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(ContactService);
    component = fixture.componentInstance;
  });
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should execute the ngOnInit method', () => {
    spyOn(service, 'getContacts').and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(component.contactForm).toBeDefined();
    expect(component.contacts.length).toBeGreaterThan(0)
  });
  it('should fail to fetch contacts', () => {
    spyOn(service, 'getContacts').and.returnValue(throwError({}));
    component.ngOnInit();
    expect(component.contacts.length).toEqual(0);
  });
  it('should save new contact to list', () => {
    component.isAdd = true;
    component.contacts = mockResponse;
    component.contactForm = new FormGroup({
      firstName: new FormControl('Honey'),
      lastName: new FormControl('Singh'),
      phone: new FormControl('9998887770'),
      id: new FormControl(),
    });
    component.save();
    expect(component.contacts[2].firstName).toEqual('Honey');
  });
  it('should update existing contact to list', () => {
    component.isAdd = false;
    component.contacts = mockResponse;
    component.contactForm = new FormGroup({
      firstName: new FormControl('Amit'),
      lastName: new FormControl('Sharma'),
      phone: new FormControl('9998887770'),
      id: new FormControl(1),
    });
    component.save();
    expect(component.contacts[0].lastName).toEqual('Sharma');
  });
  it('should reset form and update the add flag', () => {
    component.contactForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      id: new FormControl(),
    });
    spyOn(component.contactForm, 'reset');
    component.add();
    expect(component.contactForm.reset).toHaveBeenCalled();
    expect(component.isAdd).toBe(true);
  });
  it('should update the contact', () => {
    component.contactForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      id: new FormControl(),
    });
    spyOn(component.contactForm, 'setValue');
    const contact = {
      firstName: 'Amit',
      lastName: 'Roy',
      phone: '9876543210',
      id: 1,
    };
    component.edit(contact);
    expect(component.isAdd).toBe(false);
    expect(component.contactForm.setValue).toHaveBeenCalled();
  });
  it('should remove contact from the list', () => {
    component.contacts = mockResponse;
    component.delete(1);
    expect(component.contacts[0].firstName).toEqual('Aakash');
  });
});
