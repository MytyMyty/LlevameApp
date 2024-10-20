import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private apiUrl = environment.apiURL2;

  constructor(private http: HttpClient) { }

  getPlaces()  {
    return this.http.get(`${this.apiUrl}/places`);
  }

}