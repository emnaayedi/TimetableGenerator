import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MatierEnsService {

  constructor(private http: HttpClient) { }

  PostMatierEnsList(formData){
    return this.http.post(environment.apiBaseURI + '/MatierEns',formData);
  }
  
  PutMatierEnsList(formData){
    return this.http.put(environment.apiBaseURI + '/MatierEns/'+ formData.CodeFil,formData);
  }

  deleteMatierEnsList(id){
    return this.http.delete(environment.apiBaseURI + '/MatierEns/'+id);
  }

  getMatierEnsList(){
    return this.http.get(environment.apiBaseURI + '/MatierEns');

  }


}
