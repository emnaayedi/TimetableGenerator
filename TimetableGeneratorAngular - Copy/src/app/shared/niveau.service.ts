import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  // constructor(private http: HttpClient) { }

  // getNiveauList(){
  //   return this.http.get(environment.apiBaseURI + '/Niveau');

  // }


  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiBaseURI}${path}`, {params, headers: this.headers});
  }
  PostNiveauList(formData){
    
    return this.http.post(environment.apiBaseURI + '/Niveau',formData);
    
  }
  
  PutNiveauList(formData){
    console.log(formData);
    return this.http.put(environment.apiBaseURI + '/Niveau/'+ formData.IdNiv,formData);

  }

  deleteNiveauList(id){
    return this.http.delete(environment.apiBaseURI + '/Niveau/'+id);
  }

  getNiveauList(){
    return this.http.get(environment.apiBaseURI + '/Niveau');

  }
}
