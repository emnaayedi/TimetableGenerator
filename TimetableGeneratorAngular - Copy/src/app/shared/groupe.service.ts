import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  constructor(private http: HttpClient) { }

  getGroupeList(){
    return this.http.get(environment.apiBaseURI + '/Groupes');

  }

  PostGroupeList(formData){
    return this.http.post(environment.apiBaseURI + '/Groupes',formData);
  }
  
  PutGroupeList(formData){
    return this.http.put(environment.apiBaseURI + '/Groupes/'+ formData.IdGroup,formData);
  }

  deleteGroupeList(id){
    return this.http.delete(environment.apiBaseURI + '/Groupes/'+id);
  }

  



}
