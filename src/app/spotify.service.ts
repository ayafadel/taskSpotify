import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, debounceTime, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  auth_token='';
  spotifyApi: Spotify.SpotifyWebApiJs ;
  querySearchArtist: string='';
  querySearchArtistId:string='';

  saveArtists:any=[];
  private httpOptions ={
    headers: new HttpHeaders({"Accept": 'application/json', 'Content-Type': 'application/json',
    'Authorization':this.auth_token })
  };

  constructor(private router: Router,private http:HttpClient) {
    this.spotifyApi = new Spotify();
  }


  UrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    console.log(authEndpoint + clientId + redirectUrl + scopes + responseType);
    return authEndpoint + clientId + redirectUrl + scopes + responseType; 
  }

  TokenUrlCallback() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    console.log(params);

    return params[0].split('=')[1];
  }
  login(){
    const t=localStorage.getItem('token');
    const url=this.UrlLogin();
    console.log(url)
    return this.http.get(url,{
      headers: new HttpHeaders({"Accept": 'application/json', 'Content-Type': 'application/json',
      'Authorization':'Bearer '+t })
    });
  }

  defineAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    console.log(token)
    
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  getArtist():Observable<any> {

    const t=localStorage.getItem('token');
    const url=`https://api.spotify.com/v1/search?q=${this.querySearchArtist}&type=artist`;
    return this.http.get(url,{
      headers: new HttpHeaders({"Accept": 'application/json', 'Content-Type': 'application/json',
      'Authorization':'Bearer '+t })
    });
  }

  getAlbums():Observable<any> {
    console.log(localStorage.getItem('token'))
    const t=localStorage.getItem('token');
    const url=`https://api.spotify.com/v1/artists/${this.querySearchArtistId}/albums`;
    return this.http.get(url,{
      headers: new HttpHeaders({"Accept": 'application/json', 'Content-Type': 'application/json',
      'Authorization':'Bearer '+t})
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        alert(error.error)
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  checkAccess(){
    const t=localStorage.getItem('token');
    const url=`https://api.spotify.com/v1/me`;
    return this.http.get(url,{
      headers: new HttpHeaders({"Accept": 'application/json', 'Content-Type': 'application/json',
      'Authorization':'Bearer '+t })
    }).pipe(catchError(this.handleError));
  }
}
