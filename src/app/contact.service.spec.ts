import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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

describe('ContactService', () => {
  let service: ContactService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ContactService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return list of contacts', () => {
    service.getContacts().subscribe((contacts) => {
      expect(contacts).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne(service._baseURL + '/contacts');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
