import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.css']
})
export class ValuationComponent implements OnInit {

  postAddForm: FormGroup = new FormGroup({});

  image: any;
  imageRc: any;
  showBrands:any[]=[];
  showModels:any[]=[];
  showType:any[]=[];
  selectedVehicle:any="";
  selectedbrand:any="";
  selectedModel:any="";
  selectedType:any="";
  showPrice:any="";
  beforeSubmit:boolean=true;
  showLoader:boolean= false;


   bikesBrands = ['Yamaha', 'Royal_Enfield', "Suzuki", "Mahendra", 'TVS', 'Bajaj','Honda', 'Hero'];
   carsBrands = ['Ford', 'Nissan', 'Volkswagen','Chevrolet', 'Toyota','Honda', 'Hyundai', 'Mahindra', 'Tata',  'Renault', 'Ambassador', 'Mercedes', 'BMW', 'Datsun', 'Land_Rover', 'Bajaj','Maruti', 'Skoda', 'Fiat', 'Mitsubishi', 'Opel' ];
   tractorsBrand = ['Mahindra','Swaraj', 'Massey_Ferguson', 'Sonalika', 'Powertrac', 'Eicher', 'John_Deere', 'Farmtrac', 'New_Holland', 'Kubota', 'Solis', 'Preet', 'VST', 'Indo Farm', 'Captain', 'ACE', 'Digitrac', 'Force', 'Trakstar', 'Hindustan', 'Kartar', 'Same Deutz Fahr', 'Escorts'  ]

 modelMaruti = ['Omni', 'Gypsy', 'Esteem', 'Baleno', 'Zen_Estilo', 'Ritz', 'Swift_Dzire', '1000','800', 'Alto', 'Zen', 'Wagon_R', 'Versa', 'Swift', 'Ciaz', 'Ertiga', 'A_Star', 'S_Presso', 'Vitara', 'Breeza' ];
 modelHyundai = [ 'Sonata', 'Accent', 'Tucson', 'Terracan' ,'Accent', 'i10', 'i20','Verna', 'Creta', 'Venue', 'Santro', 'Elantra', 'Santa_FE' ];
 modelHonda = ['Jazz', 'City', 'Amaze','Accord', 'Civic', 'WR_V', 'Brio', 'BR_V', 'CR_V' ];
 modelTata = [ 'Estate', 'Sierra', 'Sumo', 'Safari', 'Indica','Sumo_Grande', 'Vista', 'Nano', 'Manza', 'Aria', 'Zest', 'Bolt', 'Indigo','Indigo_Marina' ];
 modelChevrolet = [ 'Beat', 'Tavera', 'Aveo', 'Optra', 'Sail', 'UVA','Cruze', 'Spark' ];
 modelToyota = ['Innova' ,'Corolla','Fortuner', 'Etios' ];
 modelMahindra = [ 'Xylo', 'Scorpio','Bolero' ];
 modelFord = ['Endeavour', 'Fusion', 'Figo',  'Ikon', 'Escort', 'Mondeo', 'Fiesta','EcoSport', 'Aspire' ];
 modelNissan = ['Kicks', 'Sunny','Micra', 'Magnite' ];
 modelVolkswagen = [ 'Vento', 'Jetta', 'Tiguan','Polo' ];
 modelSkoda = [ 'Rapid', 'Fabia', 'Laura', 'Superb','Octavia' ];
 modelFiat = [ 'Palio', 'Punto','Uno', 'Siena', 'Evo', 'Premier_118', 'Linea', 'Padmini' ];
 modelMitsubishi = [ 'Cedia', 'Challenger','Pajero','Lancer', 'Montero' ];
 modelOpel = ['Astra', 'Vectra', 'Corsa' ];
 modelRenault = ['Duster' ];
 modelAmbassador = ['Contessa', 'Ambassador' ];
 modelMercedes = ['300_D', 'Benz_C', , 'C_200','Benz_S', 'Benz_E' ];
 modelBMW = ['525', 'M_5' ];
 modelDatsun = ['Datsun_Go','Redi_Go' ];
 modelLand_Rover = [ 'Defender','Discovery','Range_Rover' ];
 modelBajaj = ['Qute', 'Auto' ];

 modelBikeHero = ['Mastro', 'Xtreme','Splender', 'Passion', 'Pleasure', 'Maestro', 'Super_Splender', 'Hf_Deluxe', 'CBZ', 'Glamour', 'Destini', 'X_Pulse' ];
 modelBikeTvs = [ 'Jupitor', 'Rider', 'i_Qube_EV', 'Radeon','Apache', 'XL_100', 'Super_XL', 'Fiero' ,'Victor', 'N_Torq', 'Scooty_Pep', 'Star_City', 'Sport', 'Scooty_Zest' ];
 modelBikeBajaj = [ 'Platina', 'CT_100', 'Dominar', 'Avenger','Pulsar',  'Priya', 'CUB','Discover', 'Chetak' ];
 modelBikeHonda = ['CB_(Series)', 'Aviator', 'Eterno','Unicorn',  'Livo', 'Shine', 'Grazia', 'SP', 'X_Blade', 'Hornet', 'CD_100', 'Dio', 'Activa','CB_200', 'HNESS', 'Kinetic', 'CRB_(Series)' ];
 modelBikeYamaha = ['Aerox', 'Fazer' , 'FZ', 'RX_100', 'Libero', 'R_15', 'Ray_ZR' ,'Fascino'];
 modelBikeSuzuki = ['Fiero', 'Heat', 'Gixxer', 'Access_125', 'Burgman', 'Avenis', "Samuri", 'Shogun' ];
 modelBikeRoyalEnfield = ['Thunderbird', 'Bullet_350cc', 'Bullet_500cc',  'RoyalEnfield'  ];
 modelBikeMahendra = ['Rodeo', 'Mojo', "Gusto", 'Centuro' ];

 modelTractorMahindra = ['Mahindra_575_DI', "Mahindra_Arjun_555_DI"]


 fuleType = ['Petrol', 'Diesel', 'Petrol_CNG' ];
 wheelType = ['Alloy_Mag_Wheel', 'Spoxes_Wheel', 'Drum_Wheel'  ];
 wheelTypeForRoyal_Enfield = ['Wheel Type', 'Alloy_Mag_Wheel', 'Spoxes_Wheel' ];

  yearData = [2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984]
  ConditionList = ['Running', 'Not_Running' ];
  cityList = ['Bangalore', 'Delhi', "Kolkata", "Indore", "Bombay", "Bangladesh", "Chennai" ];


  constructor(private fb: FormBuilder, private api:ApiService, private fetch:ObservableService) { 
    this.postAddForm = this.fb.group({
        email: ['', [Validators.required]],
        vehicleType: ['', [Validators.required]],
      description: [''],
      condition: ['', [Validators.required]],
      location: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      modelName: [''],
      fuleWhellType: [''],
      manufactureYear: ['', [Validators.required]],
      vehiclePictures: this.fb.array([this.newImage()]),
      rcPictures: this.fb.array([this.secondImage()]),
    });

    this.fetch.getDataSubject.subscribe((res: any) => {
      console.log("in single page", res );
  
      });
  }

  get f() {
    return this.postAddForm.controls;
  }
  newImage(): FormGroup {
    return this.fb.group({
      img: [''],
      imgName: [''],
      // fileName: [''],
      // fileNameToDisplay: ['', [Validators.required]],
      // btnUpload: [false],
      // cancelBtn: [false],
    });
  }

  secondImage(): FormGroup {
    return this.fb.group({
      img: [''],
      imgName: [''],
      // fileName: [''],
      // fileNameToDisplay: ['', [Validators.required]],
      // btnUpload: [false],
      // cancelBtn: [false],
    });
  }

  get abc(): FormArray {
    return this.postAddForm.get('vehiclePictures') as FormArray;
  }

  get def(): FormArray {
    return this.postAddForm.get('rcPictures') as FormArray;
  }
  addImg() {
    this.abc.push(this.newImage());
  }

  addSecondImg() {
    this.def.push(this.secondImage());
  }
  removeSecondImage(i: number) {
    this.def.removeAt(i);
  }
  removeSkill(i: number) {
    this.abc.removeAt(i);
  }

  ngOnInit(): void {
  }

  showVehiclePrice(){
    if (this.selectedVehicle == "Car") {
      if (this.selectedbrand == "Maruti") {
          if (this.selectedModel == "800" && this.selectedType== "Petrol") {
              this.showPrice = "10,000"
              // alert("Estimated Price Range of "+ model +" is : " + showPrice)
          }
          else if (this.selectedModel == "800" && this.selectedType== "Diesel") {
              this.showPrice = "15,000"

          }
          
          else if (this.selectedModel == "Wagon_R" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Wagon_R" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Wagon_R" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Zen" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Zen" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Zen" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "25,000"

          }

          else if (this.selectedModel == "Celerio" && this.selectedType== "Petrol") {
              this.showPrice = "23,000"

          }
          else if (this.selectedModel == "Celerio" && this.selectedType== "Diesel") {
              this.showPrice = "28,000"

          }
          
          else if (this.selectedModel == "Versa" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Versa" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Versa" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Swift" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Swift" && this.selectedType== "Diesel") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Swift" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "33,000"

          }
          else if (this.selectedModel == "Omni" && this.selectedType== "Petrol") {
              this.showPrice = "17,000"

          }
          else if (this.selectedModel == "Omni" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Omni" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "22,000"

          }


          else if (this.selectedModel == "A_Star" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "A_Star" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "S_Presso" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "S_Presso" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "S_Presso" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Vitara" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Vitara" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Breeza" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Breeza" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }



          

          else if(this.selectedModel == "Gypsy" && this.selectedType=="Petrol"){
              this.showPrice = "20,000"
               
          }
          else if(this.selectedModel == "Gypsy" && this.selectedType=="Diesel"){
              this.showPrice = "30,000"
               
          }
          // else if(this.selectedModel == "Gypsy King" && this.selectedType=="Petrol"){
          //     this.showPrice = "1,000"
          //      
          // }
          // else if(this.selectedModel == "Gypsy King" && this.selectedType=="Diesel"){
          //     this.showPrice = "18,000"
          //      
          // }
          // else if(this.selectedModel == "1000" && this.selectedType=="Petrol"){
          //     this.showPrice = "1,000"
          //      
          // }
          // else if(this.selectedModel == "1000" && this.selectedType=="Diesel"){
          //     this.showPrice = "18,000"
          //      
          // }
          else if (this.selectedModel == "Esteem" && this.selectedType== "Petrol") {
              this.showPrice = "18,000"

          }
          else if (this.selectedModel == "Esteem" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Esteem" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Baleno" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Baleno" && this.selectedType== "Diesel") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Baleno" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Zen_Estilo" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Zen_Estilo" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Zen_Estilo" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Ritz" && this.selectedType== "Petrol") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Ritz" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Ritz" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Swift_Dzire" && this.selectedType== "Petrol") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Swift_Dzire" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Swift_Dzire" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Alto" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Alto" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Alto" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Ciaz" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Ciaz" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Ciaz" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Ertiga" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Ertiga" && this.selectedType== "Diesel") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "Ertiga" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "45,000"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Hyundai") {
          if (this.selectedModel == "Accent" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Accent" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "i10" && this.selectedType== "Petrol") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "i10" && this.selectedType== "Diesel") {
              this.showPrice = "55,000"

          }
          else if (this.selectedModel == "i20" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "i20" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Santro" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Santro" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Santro" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Elantra" && this.selectedType== "Petrol") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Elantra" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Sonata" && this.selectedType== "Petrol") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Sonata" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Accent" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Accent" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Santa_FE" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Santa_FE" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Verna" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Verna" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Creta" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Creta" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Venue" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Venue" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Honda") {
          if (this.selectedModel == "Accord" && this.selectedType== "Petrol") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "Accord" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Accord" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Civic" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Civic" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Civic" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "55,000"

          }
          else if (this.selectedModel == "Brio" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Brio" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Brio" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "BR_V" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "BR_V" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "BR_V" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "CR_V" && this.selectedType== "Petrol") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "CR_V" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "CR_V" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Jazz" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Jazz" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Jazz" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "City" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "City" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "City" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Amaze" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Amaze" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Amaze" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "WR_V" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "WR_V" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "WR_V" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "35,000"

          }
         

          else {

          }
      }

      else if (this.selectedbrand == "Tata") {
          if (this.selectedModel == "Safari" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Safari" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Indica" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Indica" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Indigo" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Indigo" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Estate" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Estate" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Sierra" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Sierra" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Sumo" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Sumo" && this.selectedType== "Diesel") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Indigo_Marina" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Indigo_Marina" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Sumo_Grande" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Sumo_Grande" && this.selectedType== "Diesel") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Vista" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Vista" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Nano" && this.selectedType== "Petrol") {
              this.showPrice = "10,000"

          }
          else if (this.selectedModel == "Nano" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Manza" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Manza" && this.selectedType== "Diesel") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Aria" && this.selectedType== "Petrol") {
              this.showPrice = "24,000"

          }
          else if (this.selectedModel == "Aria" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Zest" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Zest" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Bolt" && this.selectedType== "Petrol") {
              this.showPrice = "24,000"

          }
          else if (this.selectedModel == "Bolt" && this.selectedType== "Diesel") {
              this.showPrice = "32,000"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Chevrolet") {
          if (this.selectedModel == "Cruze" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Cruze" && this.selectedType== "Diesel") {
              this.showPrice = "55,000"

          }
          else if (this.selectedModel == "Cruze" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Spark" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Spark" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Spark" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Beat" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Beat" && this.selectedType== "Diesel") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Beat" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Optra" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Optra" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Sail" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Sail" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          // else if (this.selectedModel == "Captiva" && this.selectedType== "Petrol") {
          //     this.showPrice = "80,000"

          // }
          // else if (this.selectedModel == "Captiva" && this.selectedType== "Diesel") {
          //     this.showPrice = "100,000"

          // }
          else if (this.selectedModel == "UVA" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "UVA" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Tavera" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Tavera" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Aveo" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Aveo" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Toyota") {
          if (this.selectedModel == "Corolla" && this.selectedType== "Petrol") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Corolla" && this.selectedType== "Diesel") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "Corolla" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Etios" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Etios" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Fortuner" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Fortuner" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Fortuner" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Innova" && this.selectedType== "Petrol") {
              this.showPrice = "70,000"

          }
          else if (this.selectedModel == "Innova" && this.selectedType== "Diesel") {
              this.showPrice = "80,000"

          }
          else if (this.selectedModel == "Innova" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Mahindra") {
          if (this.selectedModel == "Scorpio" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Scorpio" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Bolero" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Bolero" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Xylo" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Xylo" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Ford") {
          if (this.selectedModel == "Ikon" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Ikon" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Ikon" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Escort" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Escort" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Endeavour" && this.selectedType== "Petrol") {
              this.showPrice = "70,000"

          }
          else if (this.selectedModel == "Endeavour" && this.selectedType== "Diesel") {
              this.showPrice = "80,000"

          }
          else if (this.selectedModel == "Fusion" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Fusion" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Figo" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Figo" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Figo" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "EcoSport" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "EcoSport" && this.selectedType== "Diesel") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "EcoSport" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else if (this.selectedModel == "Aspire" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Aspire" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Aspire" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else if (this.selectedModel == "Mondeo" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Mondeo" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Mondeo" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else if (this.selectedModel == "Fiesta" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Fiesta" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Fiesta" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Nissan") {
          if (this.selectedModel == "Datsun Go" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Datsun Go" && this.selectedType== "Diesel") {
              this.showPrice = "34,000"

          }
          // else if (this.selectedModel == "X-Trail" && this.selectedType== "Petrol") {
          //     this.showPrice = "40,000"

          // }
          // else if (this.selectedModel == "X-Trail" && this.selectedType== "Diesel") {
          //     this.showPrice = "50,000"

          // }
          else if (this.selectedModel == "Micra" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Micra" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Sunny" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Sunny" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Magnite" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Magnite" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Kicks" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Kicks" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }

          else {


          }
      }

      else if (this.selectedbrand == "Volkswagen") {
          if (this.selectedModel == "Polo" && this.selectedType== "Petrol") {
              this.showPrice = "22,000"

          }
          else if (this.selectedModel == "Polo" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Polo" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Vento" && this.selectedType== "Petrol") {
              this.showPrice = "24,000"

          }
          else if (this.selectedModel == "Vento" && this.selectedType== "Diesel") {
              this.showPrice = "32,000"

          }
          else if (this.selectedModel == "Jetta" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Jetta" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Tiguan" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Tiguan" && this.selectedType== "Diesel") {
              this.showPrice = "32,000"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Skoda") {
          if (this.selectedModel == "Octavia" && this.selectedType== "Petrol") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Octavia" && this.selectedType== "Diesel") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "Rapid" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Rapid" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Rapid" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Laura" && this.selectedType== "Petrol") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Laura" && this.selectedType== "Diesel") {
              this.showPrice = "70,000"

          }
          else if (this.selectedModel == "Superb" && this.selectedType== "Petrol") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Superb" && this.selectedType== "Diesel") {
              this.showPrice = "70,000"

          }
          else if (this.selectedModel == "Superb" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Fabia" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Fabia" && this.selectedType== "Diesel") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "Fabia" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Fiat") {
          if (this.selectedModel == "Uno" && this.selectedType== "Petrol") {
              this.showPrice = "18,000"

          }
          else if (this.selectedModel == "Uno" && this.selectedType== "Diesel") {
              this.showPrice = "23,000"

          }
          else if (this.selectedModel == "Uno" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Siena" && this.selectedType== "Petrol") {
              this.showPrice = "18,000"

          }
          else if (this.selectedModel == "Siena" && this.selectedType== "Diesel") {
              this.showPrice = "23,000"

          }
          else if (this.selectedModel == "Siena" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Palio" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Palio" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Punto" && this.selectedType== "Petrol") {
              this.showPrice = "27,000"

          }
          else if (this.selectedModel == "Punto" && this.selectedType== "Diesel") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Punto" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Evo" && this.selectedType== "Petrol") {
              this.showPrice = "22,000"

          }
          else if (this.selectedModel == "Evo" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Evo" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Linea" && this.selectedType== "Petrol") {
              this.showPrice = "35,000"

          }
          else if (this.selectedModel == "Linea" && this.selectedType== "Diesel") {
              this.showPrice = "45,000"

          }
          else if (this.selectedModel == "Linea" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Padmini" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Padmini" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Padmini" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Premier_118" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Premier_118" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Premier_118" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Opel") {
          if (this.selectedModel == "Astra" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Astra" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Astra" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Corsa" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Corsa" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Corsa" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Vectra" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Vectra" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Vectra" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Mitsubishi") {
          if (this.selectedModel == "Lancer" && this.selectedType== "Petrol") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Lancer" && this.selectedType== "Diesel") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Lancer" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else if (this.selectedModel == "Cedia" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Cedia" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Cedia" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else if (this.selectedModel == "Challenger" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Challenger" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Challenger" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else if (this.selectedModel == "Montero" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Montero" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Montero" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else if (this.selectedModel == "Pajero" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Pajero" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Pajero" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "Not Available"

          }

          else {

          }
      }

      else if (this.selectedbrand == "Renault") {
          if (this.selectedModel == "Duster" && this.selectedType== "Petrol") {
              this.showPrice = "30,000"

          }
          else if (this.selectedModel == "Duster" && this.selectedType== "Diesel") {
              this.showPrice = "40,000"

          }

          else {

          }
      }
      else if (this.selectedbrand == "Ambassador") {
          if (this.selectedModel == "Ambassador" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Ambassador" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }
          else if (this.selectedModel == "Contessa" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Contessa" && this.selectedType== "Diesel") {
              this.showPrice = "25,000"

          }

          else {

          }
      }
      else if (this.selectedbrand == "BMW") {
          if (this.selectedModel == "525" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "525" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "M_5" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "M_5" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }

          else {

          }
      }
      else if (this.selectedbrand == "Mercedes") {
          if (this.selectedModel == "Benz_C" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Benz_C" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Benz_S" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Benz_S" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "C_200" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "C_200" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "300_D" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "300_D" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }
          else if (this.selectedModel == "Benz_E" && this.selectedType== "Petrol") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Benz_E" && this.selectedType== "Diesel") {
              this.showPrice = "60,000"

          }

          else {

          }
      }
      else if (this.selectedbrand == "Datsun") {
          if (this.selectedModel == "Redi_Go" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Redi_Go" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Redi_Go" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "50,000"

          }

          else if (this.selectedModel == "Datsun_Go" && this.selectedType== "Petrol") {
              this.showPrice = "40,000"

          }
          else if (this.selectedModel == "Datsun_Go" && this.selectedType== "Diesel") {
              this.showPrice = "50,000"

          }
          else if (this.selectedModel == "Datsun_Go" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "50,000"

          }

          

          else {

          }
      }
      else if (this.selectedbrand == "Bajaj") {
          if (this.selectedModel == "Qute" && this.selectedType== "Petrol") {
              this.showPrice = "20,000"

          }
          else if (this.selectedModel == "Qute" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Qute" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "25,000"

          }

          else if (this.selectedModel == "Auto" && this.selectedType== "Petrol") {
              this.showPrice = "15,000"

          }
          else if (this.selectedModel == "Auto" && this.selectedType== "Diesel") {
              this.showPrice = "Not Available"

          }
          else if (this.selectedModel == "Auto" && this.selectedType== "Petrol_CNG") {
              this.showPrice = "20,000"

          }

        

          

          else {

          }
      }
      else if (this.selectedbrand == "Land_Rover") {
          if (this.selectedModel == "Range_Rover" && this.selectedType== "Petrol") {
              this.showPrice = "1,20,000"

          }
          else if (this.selectedModel == "Range_Rover" && this.selectedType== "Diesel") {
              this.showPrice = "1,20,000"

          }
       

          else if (this.selectedModel == "Defender" && this.selectedType== "Petrol") {
              this.showPrice = "1,20,000"

          }
          else if (this.selectedModel == "Defender" && this.selectedType== "Diesel") {
              this.showPrice = "1,20,000"

          }

          else if (this.selectedModel == "Discovery" && this.selectedType== "Petrol") {
              this.showPrice = "1,20,000"

          }
          else if (this.selectedModel == "Discovery" && this.selectedType== "Diesel") {
              this.showPrice = "1,20,000"

          }
          

          

          else {

          }
      }
      // else{
      //     document.getElementById("finalPrice").innerText = "Contact us to know your vehicle value";  
      // }
      // window.localStorage.setItem('Price','khjh')
      // window.localStorage.setItem('tFinalPrice',"Estimated Price Range of " + model + " " + "(" + fuleType + ")" + " is : ₹ " + showPrice)

      // $('#finalPrice').innerText = "Estimated Price Range of "+ model +" is : " + showPrice;
      // document.getElementById("finalPrice").innerText = "Estimated Price Range of " + model + " " + "(" + fuleType + ")" + " is : ₹ " + showPrice;
  }
  else if (this.selectedVehicle == "Bike") {
      if (this.selectedbrand == "Royal_Enfield") {
          if (this.selectedType== "Alloy_Mag_Wheel") {
              this.showPrice = "5,000 - 7,000"
          }
          else if (this.selectedType== "Spoxes_Wheel") {
              this.showPrice = "5,000 - 6,000"
          }
      }
      else if(this.selectedbrand == "Honda" && this.selectedModel =='Kinetic'){
          this.showPrice = "700 - 1,000"
      }
      else{
          if (this.selectedType== "Alloy_Mag_Wheel") {
              this.showPrice = "2,000 - 3,000"
          }
          else if (this.selectedType== "Spoxes_Wheel") {
              this.showPrice = "1,500 - 2,000"
          }
          else if (this.selectedType== "Drum_Wheel") {
              this.showPrice = "1,500 - 2,000"
          }
      }
      

     
      // window.localStorage.setItem('Price','khjh')
      // window.localStorage.setItem('tFinalPrice',"Estimated Price Range of " + model + " " + "(" + fuleType + ")" + " is : ₹ " + showPrice)

      // $('#finalPrice').innerText = "Estimated Price Range of "+ model +" is : " + showPrice; 
      // document.getElementById("finalPrice").innerText = "Estimated Price Range of "  + model + " " + "(" + fuleType + ")" + " is : ₹ " + showPrice;
      //     document.getElementById("onlyForm").style.display = 'none';
      // document.getElementById("onlyValuation").style.display = 'block';
      // $('#onlyForm').css({display :"none"});
      // $('#onlyValuation').css({display :"block"});
      console.log("showPrice+bike", this.showPrice)

  }
  }

  changeListeners($event: any, i: any): void {
    this.readThiss($event.target, i);
  }

  changeListenersRc($event: any, i: any): void {
    this.rcReadThis($event.target, i);
  }

  rcReadThis(inputValue: any, i: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();


    myReader.onloadend = (e) => {
      console.log(e.currentTarget);
      this.imageRc = myReader.result;
      console.log(typeof myReader.result, '2');

      let a: any = this.postAddForm.controls['rcPictures'];
      console.log(
        "this.addCarForm.controls['rcPictures']",
        a['controls'][i].value
      );
      a['controls'][i].patchValue({
        img: myReader.result,
      });

      console.log(
        "this.addCarForm.controls['rcPictures']",
        a['controls'][i].value
      );
    };
    myReader.readAsDataURL(file);
  }
  readThiss(inputValue: any, i: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();


    myReader.onloadend = (e) => {
      console.log(e.currentTarget);
      this.image = myReader.result;
      console.log(typeof myReader.result, '2');

      let a: any = this.postAddForm.controls['vehiclePictures'];
      console.log(
        "this.addCarForm.controls['vehiclePictures']",
        a['controls'][i].value
      );
      a['controls'][i].patchValue({
        img: myReader.result,
      });

      console.log(
        "this.addCarForm.controls['vehiclePictures']",
        a['controls'][i].value
      );
    };
    myReader.readAsDataURL(file);
  }

  brandSelected(data:any){
    console.log(data.value);
    this.showModels = [];
    this.showType = [];
    this.selectedbrand =data.value;


    if(this.selectedVehicle == "Car"){
      console.log("car car car")
      if (this.selectedbrand == "Maruti") {
          this.showModels = this.modelMaruti;
      }


      else if (this.selectedbrand == "Hyundai") {
          this.showModels = this.modelHyundai;

      }


      else if (this.selectedbrand == "Honda") {
          this.showModels = this.modelHonda;

      }


      else if (this.selectedbrand == "Chevrolet") {
          this.showModels = this.modelChevrolet;

      }


      else if (this.selectedbrand == "Tata") {
          this.showModels = this.modelTata;

      }


      else if (this.selectedbrand == "Toyota") {
          this.showModels = this.modelToyota;

      }


      else if (this.selectedbrand == "Mahindra") {
          this.showModels = this.modelMahindra;

      }


      else if (this.selectedbrand == "Ford") {
          this.showModels = this.modelFord;

      }


      else if (this.selectedbrand == "Nissan") {
          this.showModels = this.modelNissan;

      }


      else if (this.selectedbrand == "Volkswagen") {
          this.showModels = this.modelVolkswagen;

      }


      else if (this.selectedbrand == "Skoda") {
          this.showModels = this.modelSkoda;

      }


      else if (this.selectedbrand == "Fiat") {
          this.showModels = this.modelFiat;

      }


      else if (this.selectedbrand == "Mitsubishi") {
          this.showModels = this.modelMitsubishi;

      }


      else if (this.selectedbrand == "Opel") {
          this.showModels = this.modelOpel;

      }


      else if (this.selectedbrand == "Renault") {
          this.showModels = this.modelRenault;


      }
      else if (this.selectedbrand == "Ambassador") {
          this.showModels = this.modelAmbassador;


      }
      else if (this.selectedbrand == "Mercedes") {
          this.showModels = this.modelMercedes;


      }
      else if (this.selectedbrand == "BMW") {
          this.showModels = this.modelBMW;


      }
      else if (this.selectedbrand == "Datsun") {
          this.showModels = this.modelDatsun;


      }
      else if (this.selectedbrand == "Land_Rover") {
          this.showModels = this.modelLand_Rover;


      }
      else if (this.selectedbrand == "Bajaj") {
          this.showModels = this.modelBajaj;


      }
  }
  else if( this.selectedVehicle == "Bike"){
      console.log("Bike Bike Bike")

          if (this.selectedbrand == "Hero") {
          this.showModels = this.modelBikeHero;

          }
          else if (this.selectedbrand == "TVS") {
          this.showModels = this.modelBikeTvs;

          }
          else if (this.selectedbrand == "Bajaj") {
          this.showModels = this.modelBikeBajaj;

          }
          else if (this.selectedbrand == "Honda") {
          this.showModels = this.modelBikeHonda;

          }
          else if (this.selectedbrand == "Yamaha") {
          this.showModels = this.modelBikeYamaha;

          }
          else if (this.selectedbrand == "Suzuki") {
          this.showModels = this.modelBikeSuzuki;

          }
          else if (this.selectedbrand == "Royal_Enfield") {
          this.showModels = this.modelBikeRoyalEnfield;

          }
          else if (this.selectedbrand == "Mahendra") {
          this.showModels = this.modelBikeMahendra;

          }
         
          

  }
  }

  modelSelected(data:any){
    console.log(data.value)
    this.selectedModel = data.value;
    
    if(this.selectedVehicle === "Bike"){
      // $( ".type__select.property__select" ).css( "content", "\f52f" );
      // $(abc).css( "content", "\f52f" );
      if(this.selectedbrand != "Royal_Enfield"){
          
this.showType = this.wheelType;
      }else{
          this.showType = this.wheelTypeForRoyal_Enfield;

      }


      
  }
  else if(this.selectedVehicle === "Car"){
      this.showType = this.fuleType;

  }
  }


  typeSelected(data:any){
    this.selectedType = data.value;
  }
  categorySelected(data:any){
    this.selectedVehicle = data.value;
    this.showBrands = [];
    this.showModels = [];
    this.showType = [];
    // console.log(data.value);
    if(data.value == "Bike"){
    console.log("bike is selected");
    this.showBrands = this.bikesBrands;

    }
    else if(data.value == "Tractor"){
    console.log("Tractor is selected");
    this.showBrands = this.tractorsBrand;

    }
    else if(data.value == "JCB"){
    console.log("JCB is selected");

    }
    else if(data.value == "Car"){
    console.log("Car is selected");
    this.showBrands = this.carsBrands;

    }
    else if(data.value == "Goods_Vehicle"){
    console.log("Goods_Vehicle is selected");

    }
    else{

    }
  }
  // http://localhost:59495/#/user_addPost
  
  onSubmit() {
     const data = this.postAddForm.value;
     data.Our_Price = this.showPrice;
    console.log('data', data);
    this.showLoader = true;

    this.api.postValuationForm(data).subscribe((res:any) => {
      console.log(res);
      if(res.message == "Successfully Product Create!"){
        this.beforeSubmit = false;
        alert("Data Submitted Successfully")
      
      this.showVehiclePrice();
      
      // window.location.reload();
      }else{
        alert("Something went wrong, try again")
      }

    })

    this.showLoader = false;



  }


}
