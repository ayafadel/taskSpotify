import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../navigation.service';
import { SpotifyService } from '../spotify.service';
import { PlatformLocation } from '@angular/common'
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  artistsbackdata = [];
  artistName: string = '';
  artistId: string = '';
  albumsList: any = [];
  constructor(public router: Router, public route: ActivatedRoute, private spotifyservice: SpotifyService, private navigationservice: NavigationService, private location: PlatformLocation) {


  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      let name = params['name'];
      let id = params['id'];
      this.artistsbackdata = params['artists'];
      console.log(name);
      console.log(id)
      this.artistName = name;
      this.artistId = id;
      this.spotifyservice.querySearchArtistId = this.artistId;
      this.spotifyservice.getAlbums().subscribe((albums) => {
        console.log(albums);
        for (var i = 0; i < albums['items'].length; i++) {
          const albumName = albums['items'][i]['name'];
          const albumImage = albums['items'][i]['images'][0]['url'];
          const total_tracks = albums['items'][i]['total_tracks'];
          const release_date = albums['items'][i]['release_date'];
          const external_urls = albums['items'][i]['external_urls']['spotify'];
          const artist_name = albums['items'][i]['artists'];
          const album = { "albumName": albumName, "albumImage": albumImage, "totalTracks": total_tracks, "release_date": release_date, "external_urls": external_urls, "artist_name": artist_name };
          this.albumsList.push(album);
        }
      });

    });

  }

}
