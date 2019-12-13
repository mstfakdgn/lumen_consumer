import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment, CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, SCOPE } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {
  accessTokenBearer;

  public client_id: number = CLIENT_ID;
  public client_secret: string = CLIENT_SECRET;
  public grant_type: string = GRANT_TYPE;
  public scope: string = SCOPE;

  constructor(private http: HttpClient) { }

  getToken(grantType: string, clientSecret: string, clientId: number, scope: string) {
    return this.http.post('http://localhost:8002/oauth/token',
    { this.grant_type, this.client_secret, this.client_id, this.scope }).subscribe(token => {
      this.accessTokenBearer = token.access_token;
      return this.accessTokenBearer;
    });
  }
}
