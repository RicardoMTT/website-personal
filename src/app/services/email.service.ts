import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }


  sendEmail(from:string, to:string,description:string,subject:string){
    const body = {
      from,
      to,
      description,
      subject
    }
    return this.http.post<any>( environment.emailUrl,body)
  }
}
