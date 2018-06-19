import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import Audience from "../models/audience.model";
import {Observable} from "rxjs/Rx";

const API_URL = environment.apiUrl;

@Injectable()
export class AudienceService {

  todoUrl = `${API_URL}/api/audience`;

  constructor(
    private http: HttpClient
  ) { }


  createAudience(audience: Audience): Observable<any>{
    return this.http.post(`${this.todoUrl}`, audience);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
