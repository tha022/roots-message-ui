import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AudienceService} from "./services/audience.service";
import { AudienceComponent } from './components/audience/audience.component';

@NgModule({
  declarations: [
    AppComponent,
   AudienceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
   ],
  providers: [
    AudienceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
