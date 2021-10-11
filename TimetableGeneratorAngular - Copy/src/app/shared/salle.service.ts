import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {Outil} from 'src/models/outil'

@Injectable({
  providedIn: 'root'
})
export class SalleService {


  constructor(private http: HttpClient) { }

  PostOutilList(formData){
    console.log(formData);
    return this.http.post(environment.gatewayEndpoint + '/outil-service/outils',formData);
    
  }
  
  PutOutilList(formData){
    console.log(formData);
    return this.http.put(environment.gatewayEndpoint + '/outil-service/outils/'+ formData.id,formData);

  }

  deleteOutilList(id){
    return this.http.delete(environment.gatewayEndpoint + '/outil-service/outils/'+id);
  }

  getSalleList(){
    return this.http.get(environment.gatewayEndpoint + '/outil-service/outils');

  }


  getOutilList(){
    return this.http.get(environment.gatewayEndpoint + '/outil-service/outils');

  } 
  getAllOutil(): Observable<any[]> {
    return this.http.get<any[]>(environment.gatewayEndpoint + '/outil-service/outils');
  }
  
}


