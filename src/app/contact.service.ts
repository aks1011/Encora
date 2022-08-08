import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  _baseURL =
    'https://my-json-server.typicode.com/voramahavir/contacts-mock-response';

  constructor(private _http: HttpClient) {}

  getContacts(): Observable<any> {
    return this._http.get(`${this._baseURL}/contacts`);
  }
}
