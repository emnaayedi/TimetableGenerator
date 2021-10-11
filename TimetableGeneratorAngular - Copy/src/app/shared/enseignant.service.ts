import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  constructor(private http: HttpClient) { }

  PostEnseignantList(formData){
    console.log(formData);
    return this.http.post(environment.apiBaseURI + '/Enseignant',formData);
  }
  
  PutEnseignantList(formData){
    return this.http.put(environment.apiBaseURI + '/Enseignant/'+ formData.IdEns,formData);
  }

  deleteEnseignantList(id){
    return this.http.delete(environment.apiBaseURI + '/Enseignant/'+id);
  }

  getEnseignantList(){
    return this.http.get(environment.apiBaseURI + '/Enseignant');

  }
}
