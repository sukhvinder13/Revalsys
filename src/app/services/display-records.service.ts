import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayRecordsService {

  constructor(private _http:HttpClient) { }
  getRecords():Observable<any>{
    return this._http.get("http://localhost:3000/Records")
  }
}
