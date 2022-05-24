import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  fromEvent, Subject } from 'rxjs';
import { SpotifyService } from '../spotify.service';

import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  artists: any = [];
  artistSearch: string = '';
  timer:any;
  checked: boolean = false;
 
  constructor(private spotifyservice: SpotifyService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.artists = [];
    const retrievedObject = localStorage.getItem('dataSource');
    console.log(typeof (retrievedObject))
    if (retrievedObject != null) {
      console.log(JSON.parse(retrievedObject))
      this.artists = JSON.parse(retrievedObject)
    }



    //----------

  }
  

  search() {
    this.artists = [];
    localStorage.removeItem('dataSource');

    console.log(this.artistSearch)
    this.spotifyservice.querySearchArtist = this.artistSearch;
    this.spotifyservice.getArtist().subscribe((data) => {
      console.log("post");
      console.log(data)
      this.artists = [];
      for (var i = 0; i < data['artists']['items'].length; i++) {
        const followers = data['artists']['items'][i]['followers']['total'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const popularity = data['artists']['items'][i]['popularity'];
        const image = data['artists']['items'][i]['images'][0]['url'];
        const name = data['artists']['items'][i]['name'];
        const id = data['artists']['items'][i]['id'];
        console.log(parseInt(popularity) / 20);
        var artist = { 'name': name, 'image': image, 'followers': followers, 'popularity': parseInt(popularity) / 20, 'id': id };
        this.artists.push(artist);
      }


    });
  }
  searchDelay() {
      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
        this.artists = [];
        localStorage.removeItem('dataSource');
        console.log(this.artistSearch)
        this.spotifyservice.querySearchArtist = this.artistSearch;
        this.spotifyservice.getArtist().subscribe((data) => {
          console.log("post");
          console.log(data)
          this.artists = [];
          for (var i = 0; i < data['artists']['items'].length; i++) {
            const followers = data['artists']['items'][i]['followers']['total'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const popularity = data['artists']['items'][i]['popularity'];
            const image = data['artists']['items'][i]['images'][0]['url'];
            const name = data['artists']['items'][i]['name'];
            const id = data['artists']['items'][i]['id'];
            console.log(parseInt(popularity) / 20);
            var artist = { 'name': name, 'image': image, 'followers': followers, 'popularity': parseInt(popularity) / 20, 'id': id };
            this.artists.push(artist);
          }
    
    
        });
      },500);
   

     

   
  }

  getArtist(name: string, id: string) {
    localStorage.setItem('dataSource', JSON.stringify(this.artists));

    this.router.navigate(['/albums', { 'name': name, 'id': id, 'artist': this.artists }]);

  }



}
