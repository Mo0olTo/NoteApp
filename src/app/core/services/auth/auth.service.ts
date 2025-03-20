import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  private readonly router=inject(Router)



  sendRegisterForm(data:object):Observable<any>{
   return this.httpClient.post(`${environment.baseurl}/api/v1/users/signUp`, data)
  }


  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseurl}/api/v1/users/signIn` , data)
  }


  logOut():void{
    localStorage.removeItem("userToken")
    this.router.navigate(['/login'])

  }
}
