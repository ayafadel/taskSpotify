import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private spotifyService: SpotifyService,
    private router: Router,) { }

  ngOnInit(): void {
    localStorage.clear();
    this.verificationTokenUrlCallback();

  }

  verificationTokenUrlCallback() {

    const token = this.spotifyService.TokenUrlCallback();
    if (token) {
      this.spotifyService.defineAccessToken(token);
      this.spotifyService.checkAccess().subscribe((data: any) => {
        console.log(data);


        console.log(data['email']);
   
        if (data['email'] != 'rabih@itxi.net' && data['email'] != 'h.ghandour@itxi.net' ) {
          alert("invalid")
        }
        else {
          this.router.navigate(['/search']);
        }



      })

    }



  }

  PaginaLogin() {

    window.location.href = this.spotifyService.UrlLogin();

  }

}
