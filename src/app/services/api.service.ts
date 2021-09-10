import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public ViewLoan(){
    return this.http.get('https://leadmanagementproject.herokuapp.com/service');
  }

  public AddLead(details){
    const config = new HttpHeaders().set('Content-Type','application/json')
    .set('Accept','application/json')
    return this.http.post('https://leadmanagementproject.herokuapp.com/client/requirement',details,{headers:config});

  }

  public AddLeadphp(details){

    let body = new URLSearchParams();
    body.set('name', details.name);
    body.set('service', details.service);
    body.set('contact', details.contact);
    body.set('amount', details.amount);
    body.set('date', details.date);

    const header = {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post('https://mon.lk/api/SendLead.php',body.toString(),header);
  }

  public AddLeadfeatch(details){

    fetch("https://leadmanagementproject.herokuapp.com/client/requirement", {method: "POST",
    headers: {'Content-Type': 'application/json','Accept': 'application/json',},
    body: JSON.stringify(details)
  }).then(res => {
    console.log("Request complete! response:", res);
  });
  }


}
