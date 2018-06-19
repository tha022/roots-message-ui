import { Response } from '@angular/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AudienceService} from "./services/audience.service";
import Audience from './models/audience.model'
// import { SelectCountryComponent } from "./components/select-country/select-country.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'app';
}
