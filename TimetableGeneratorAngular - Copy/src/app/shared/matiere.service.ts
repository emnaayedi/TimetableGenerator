import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/map';
import { Matiere } from 'src/app/matiere/matiere';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Publication } from 'src/models/publication';
import { Member } from 'src/models/member';


@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  constructor(private http: HttpClient) { }

 
  getUsers(): Observable<any[]> {
        return this.http.get<any[]>(environment.apiBaseURI + '/Matiere');

}

PostMatiereList(publication:any): Promise<Publication>{
  return this.http.put<Publication>(environment.gatewayEndpoint + '/publication-service/publications/'+publication['id'],publication).toPromise();
}

PutMatiereList(publication :Publication): Promise<Publication>{
  console.log(publication);
  return this.http.put<Publication>(environment.gatewayEndpoint + '/publication-service/publications/'+publication['id'],publication).toPromise();
}

deleteMatiereList(id:string): Promise<void> {
  return this.http.delete<void>(environment.gatewayEndpoint + '/publication-service/publications/'+id).toPromise();   
  
}
getMatiereList(): Promise<Publication[]> {
  return this.http.get<Publication[]>(environment.gatewayEndpoint + '/publication-service/publications').toPromise();   
  
}
getMatiereById(id:string):Promise<Publication> {
  return this.http.get<Publication>(environment.gatewayEndpoint + '/publication-service/publications/'+id).toPromise();   
  
}
  
addParticipanttoEvenement(member:Member): Promise<Member>{
  return this.http.put<Member>(environment.gatewayEndpoint + '/membre-service/membres/'+member['id'],member).toPromise();
}

}
