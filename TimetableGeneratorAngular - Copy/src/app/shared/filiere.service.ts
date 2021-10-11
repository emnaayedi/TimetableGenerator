import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Filiere } from 'src/app/filiere/filiere';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor(private http: HttpClient) { }

  PostFiliereList(formData){
    return this.http.post(environment.apiBaseURI + '/Filiere',formData);
  }
  
  PutFiliereList(formData){
    return this.http.put(environment.apiBaseURI + '/Filiere/'+ formData.CodeFil,formData);
  }

  deleteFiliereList(id){
    return this.http.delete(environment.apiBaseURI + '/Filiere/'+id);
  }

  getFiliereList(){
    return this.http.get(environment.apiBaseURI + '/Filiere');

  }

  getFil(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(environment.apiBaseURI + '/Filiere');

}
}
