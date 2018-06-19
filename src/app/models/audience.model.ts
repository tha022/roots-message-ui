class Audience {
  _id: string;
  name: string;
  surname: string;
  email: string;
  date: Date;
  country: string;
  city: string;
  ageFrom: number;
  ageTo: number;
  gender: string;
  interests: string [];
  jobs: string [];
  platform: string;
  login: string;
  password: string;
  message: string;
  link: string;
  price: number;
  timeOfCampaign: number;
  organicReach: number;


  constructor(name, surname, email, country, city, login, password, message, link){
    this.name = name;
    this.surname = surname
    this.email = email;
    this.date = new Date();
    this.country = country;
    this.city = city;
    this.ageFrom = 18;
    this.ageTo = 30;
    this.gender = 'male';
    this.platform = '';
    this.login = login;
    this.password = password;
    this.message = message;
    this.link = link;
    this.price = 100;
    this.timeOfCampaign = 0;
    this.organicReach = 0;
  }

}

export default Audience;
