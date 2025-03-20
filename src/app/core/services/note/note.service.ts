import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  

  private readonly httpClient=inject(HttpClient)


  addNote(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseurl}/api/v1/notes` , data
    )
  }

  getUserNotes():Observable<any>{
    return this.httpClient.get(`${environment.baseurl}/api/v1/notes`)
  }

  updateUserNote(id:string , data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseurl}/api/v1/notes/${id}`, data)
  }


  deleteUserNote(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseurl}/api/v1/notes/${id}`)
  }

}
