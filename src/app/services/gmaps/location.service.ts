import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { iplace } from 'src/app/interfaces/iplace';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  private API_KEY= environment.googleMapsApiKey
  private API_URL= environment.apiURL2
  async getCoordsForAddress(address): Observable<iplace> {
    return this.http.get<iplace>(`${this.API_URL}/maps/api/geocode/json?address=${id}&key=${this.API_KEY}`)
  }
}

