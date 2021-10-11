import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {Enseignant} from 'src/models/enseignant';
import {Etudiant} from 'src/models/etudiant';
import { Evenement } from 'src/models/evenement';
import { Member } from 'src/models/member';
import { Publication } from 'src/models/publication';
import { Outil } from 'src/models/outil';
import { Member_evenement } from 'src/models/member_evenement';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  getPubList() : Promise<Publication[]> {
    return this.http.get<Publication[]>(environment.gatewayEndpoint + '/membre-service/publications').toPromise();
  } 
  getEventList() : Promise<Evenement[]> {
    return this.http.get<Evenement[]>(environment.gatewayEndpoint + '/membre-service/evenements').toPromise();
  } 
  getOutilList() : Promise<Outil[]> {
    return this.http.get<Outil[]>(environment.gatewayEndpoint + '/membre-service/outils').toPromise();
  } 
  affecterparticipanttoevenement(participant :Member,evenement:Evenement) :Promise<Member_evenement> {
    let params = new HttpParams()
    .set('idMember', participant['id'])
    .set('idEvent',evenement['id']);
    return this.http.post<Member_evenement>(environment.gatewayEndpoint + '/membre-service/evenements/evenement/'+evenement['id']+'/'+participant['id'] ,{params:params}).toPromise();
  } 
  constructor(private http: HttpClient) { }

  getFiliereList(){
    return this.http.get(environment.apiBaseURI + '/Module');

  }

  getAllEtudiants(): Promise<Etudiant[]> {
    return this.http.get<Etudiant[]>(environment.gatewayEndpoint + '/membre-service/membres/etudiants').toPromise();
  } 


PostEtudiantList(member:any): Promise<Etudiant>{
  return this.http.put<Etudiant>(environment.gatewayEndpoint + '/membre-service/membres/etudiant/'+member['id'],member).toPromise();
}

PutEtudiantList(member :Etudiant): Promise<Etudiant>{
  console.log(member);
  return this.http.put<Etudiant>(environment.gatewayEndpoint + '/membre-service/membres/etudiant/'+member['id'],member).toPromise();
}




getAllEnseignants(): Promise<Enseignant[]> {
  return this.http.get<Enseignant[]>(environment.gatewayEndpoint + '/membre-service/membres/enseignants').toPromise();
}

PostEnseignantsList(member:any): Promise<Enseignant>{
  return this.http.put<Enseignant>(environment.gatewayEndpoint + '/membre-service/membres/enseignant/'+member['id'],member).toPromise();
}

PutEnseignantsList(member :Enseignant): Promise<Enseignant>{
  return this.http.put<Enseignant>(environment.gatewayEndpoint + '/membre-service/membres/enseignant/'+member['id'],member).toPromise();
}


deleteMemberList(id:string): Promise<void> {
  return this.http.delete<void>(environment.gatewayEndpoint + '/membre-service/membres/'+id).toPromise();   
  
}
  


PostModuleList(formData){
  return this.http.post(environment.apiBaseURI + '/Module',formData);
}

PutModuleList(formData){
  return this.http.put(environment.apiBaseURI + '/Module/'+ formData.IdMod,formData);
}

deleteModuleList(id){
  return this.http.delete(environment.apiBaseURI + '/Module/'+id);
}

}