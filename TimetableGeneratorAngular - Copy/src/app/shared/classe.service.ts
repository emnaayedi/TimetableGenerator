import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Classe } from '../filiere/classe';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  constructor(private http: HttpClient) { }

  PostClasseList(formData){
    return this.http.post(environment.apiBaseURI + '/Classes',formData);
  }
  
  PutClasseList(formData){
    return this.http.put(environment.apiBaseURI + '/Classes/'+ formData.FiliereId,formData);
  }

  deleteClasseList(id){
    return this.http.delete(environment.apiBaseURI + '/Classes/'+id);
  }

  getClasseList(){
    return this.http.get(environment.apiBaseURI + '/Classes');

  }
  getClass(): Observable<Classe[]> {
    return this.http.get<Classe[]>(environment.apiBaseURI + '/Classes');

}

}
