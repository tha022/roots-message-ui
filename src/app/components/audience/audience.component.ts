import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AudienceService} from "../../services/audience.service";
import Audience from "../../models/audience.model";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {countries} from "../../data/countries"
import {cities} from "../../data/cities"
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-audience',
  templateUrl: './audience.component.html',
  styleUrls: ['./audience.component.css']
})
export class AudienceComponent implements OnInit {

  setPlatform(event) {
    this.newAudience.platform = event.toElement.innerHTML;
    console.log(event.toElement.innerHTML);
  }
  audienceForm: FormGroup;
  public  newAudience: Audience = new Audience('', '', '', '', '', '', '', '', '');

  constructor(
    private audienceService: AudienceService,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) { }

  formErrors = {
    'name': '',
    'surname': '',
    'email':'',
    'country': '',
    'ageFrom': '',
    'ageTo': '',
    'login': '',
    'password': '',
    'message': '',
    'link': '',
    'price': '',
  };

  validationMessages = {
    'name': {
      'required': 'firstName is required.',
      'pattern': 'Only english letters allowed'
    },
    'surname': {
      'required': 'LastName is required.',
      'pattern': 'Only english letters allowed'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Email format must be xxxxx@yyyy.zzz'
    },
    'country': {
      'required': 'Country is required',
      'pattern': 'Only english letters allowed'
    },
    'ageFrom': {
      'required': 'Age is required',
    },
    'ageTo': {
      'required': 'Age is required',
    },
    'login': {
      'required': 'Login is required',
    },
    'password': {
      'required': 'Password is required',
    },
    'message': {
      'required': 'Message example is required',
     },
    'link': {
      'required': 'Link is required',
    },
    'price': {
      'required': 'Price is required',
      'pattern': 'Only numbers allowed'
    }
  };



  onSubmit(): void {
    // // check unique email

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.audienceForm = this.fb.group({
        "name": ["", [Validators.required,
          Validators.pattern('[A-Za-z]+')]],
        "surname": ["", [Validators.required,
          Validators.pattern('[A-Za-z]+')]],
        "email": ["", [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
        "country": ["", [Validators.required,
          Validators.pattern('[A-Za-z\\s]+')]],
        "city": [""],
        "ageFrom": ["", [Validators.required]],
        "ageTo": ["", [Validators.required]],
        "gender": ["", [Validators.required]],
        "platform": [""],
        "login": ["", [Validators.required]],
        "password": ["", [Validators.required]],
        "message": ["", [Validators.required]],
        "link": ["", [Validators.required]],
        "price": ["", [Validators.required, Validators.pattern('[0-9]+')]]
      }
    );

    this.audienceForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

   onValueChanged(data?: any) {
    if (!this.audienceForm) { return; }
    const form = this.audienceForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field); // get input from form
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  create(content) {
    this.newAudience.gender = this.audienceForm.controls['gender'].value;
    this.newAudience.interests = (this.interestsList.map((obj) => obj.value)).filter((obj) => obj.length > 0);
    this.newAudience.jobs = (this.jobsList.map((obj) => obj.value)).filter((obj) => obj.length > 0);
    this.newAudience.timeOfCampaign = this.timeOfCampaign;
    this.newAudience.organicReach = this.organicReach;
    // console.log(this.newAudience);
    this.audienceService.createAudience(this.newAudience).subscribe((newAudience) => {
        this.newAudience = new Audience('', '', '', '', '', '', '', '', '')
      });
    // console.log(this.newAudience);
    this.modalService.open(content);

    this.audienceForm.reset();
  }

  interestsList = [{value: 'sports'}, {value: 'dancing'}, {value: 'music'}];

  addInterest() {
    this.interestsList.push({value: ''},{value: ''},{value: ''});
  }

  jobsList = [{value: 'owner'}, {value: 'dancer'}, {value: ''}];

  addJob() {
    this.jobsList.push({value: ''},{value: ''},{value: ''});
  }

  timeOfCampaign: number;
  organicReach: number;

  calculateBudget(){
    let inform: any[];
    let interestsLength = (this.interestsList.map((obj) => obj.value)).filter((obj) => obj.length > 0).length;
    let numberOfInterests = (interestsLength > 0) ? interestsLength * 0.01 : 0;
    let jobsLength = (this.jobsList.map((obj) => obj.value)).filter((obj) => obj.length > 0).length;
    let numberOfJobs = (jobsLength > 0) ? jobsLength * 0.02 : 0;
    let ages = (1 <= (this.newAudience.ageFrom - this.newAudience.ageTo) && (this.newAudience.ageFrom - this.newAudience.ageTo) <= 10) ? 0.02 : 0.01 ;
    let city = (this.newAudience.city) ? 0.01 : 0;
    let country = 0.01;

    let messagePrice = 0.1 + 0.02 + country + city + ages + numberOfInterests + numberOfJobs;


    let countOfMessages = isNumeric(this.newAudience.price) ? +this.newAudience.price / messagePrice : 0;
    // console.log('il' + numberOfInterests);
    // console.log('jl' + numberOfJobs);
    // console.log('ages' + ages);
    // console.log('city'+ city);
    // console.log(messagePrice);
    // console.log('countOfMessages - ' + countOfMessages);

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    this.timeOfCampaign = Math.ceil(countOfMessages / 30);
    this.organicReach = Math.ceil(countOfMessages * 100 * (0.02 + city + ages + numberOfInterests + numberOfJobs));
  }


  //for modal

  @Input()
  title;

  @Input()
  message;

  @ViewChild('content') content: any;

  closeResult: string;




  searchByCountry = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term:any)  => term.length < 2 ? []
        : countries.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  searchByCity = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term:any)  => term.length < 2 ? []
        : cities.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );


}
