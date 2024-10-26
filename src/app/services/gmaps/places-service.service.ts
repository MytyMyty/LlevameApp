import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Iplaces } from 'src/app/interfaces/iplace';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private apiUrl = environment.apiURL2;

  constructor(private http: HttpClient) { }

  getPlaces():Observable<Iplaces> { 
    return this.http.get<Iplaces>(`${this.apiUrl}/places`);
  }


}