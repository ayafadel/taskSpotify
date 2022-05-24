import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule,NbButtonModule,NbCardModule,NbIconModule,NbInputModule,NbFormFieldModule,NbToggleModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AlbumsComponent } from './albums/albums.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    AlbumsComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,HttpClientModule, BrowserAnimationsModule,
     NbLayoutModule,FormsModule,
     NbEvaIconsModule, NbButtonModule,NbCardModule,NbIconModule,NbInputModule,NbFormFieldModule,NbToggleModule,

     NbThemeModule.forRoot({ name: 'default' }),
      NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
