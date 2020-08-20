import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../_services";
import { ActivatedRoute, Router } from "@angular/router";


export class Fitness {
  inr: number;
  paisa: number;
  streetaddress: string;
  city: string;
  state: string;
  country: string;
  pincode: number;
  phonenumber: number;
  email: string;
  firstname: string;
  lastname: string;
  age: number;
  trainerpreference: string;
  physiotherapist: string;
  packages: string;
  id: string;

  constructor(
    inr: number,
    paisa: number,
    streetaddress: string,
    city: string,
    state: string,
    country: string,
    pincode: number,
    phonenumber: number,
    email: string,
    firstname: string,
    lastname: string,
    age: number,
    trainerpreference: string,
    physiotherapist: string,
    packages: string,
    id: string
  ) {
    this.inr = inr;
    this.paisa = paisa;
    this.streetaddress = streetaddress;
    this.city = city;
    this.state = state;
    this.country = country;
    this.pincode = pincode;
    this.phonenumber = phonenumber;
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.trainerpreference = trainerpreference;
    this.physiotherapist = physiotherapist;
    this.packages = packages;
    this.id = id;
  }
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
  styleUrls: ["./place-fitness-trainer-appointment.component.css"],
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {
  fitnessForm: FormGroup;
  loadingComplete = true;

  preferences = ['select','male','female','no']
  packages=['select','one-week','4-week','annual']
  appointment = {
    'firstname':'',
    'lastname':'',
    'phonenumber':'',
    'email':'',
    'age':'',
    'trainerpreference':this.preferences[0],
    'physiotherapist':'',
    'packages':this.packages[0],
    'inr':'',
    'paisa':'',
    'streetaddress':'',
    'city':'',
    'state':'',
    'country':'',
    'pincode':''  
  }

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fitnessForm = this.fb.group({
      firstname:  [this.appointment.firstname, [Validators.required]],
      lastname: [this.appointment.lastname, [Validators.required]],
      phonenumber: [this.appointment.phonenumber, [Validators.required]],
      email: [
        this.appointment.email,
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ],
      ],
      age: [this.appointment.age, [Validators.required, Validators.min(18), Validators.max(60)]],
      trainerpreference: [this.appointment.trainerpreference, [Validators.required]],
      physiotherapist: [this.appointment.physiotherapist, [Validators.required]],
      packages: [this.appointment.packages, [Validators.required]],
      inr: [this.appointment.inr, [Validators.required]],
      paisa: [this.appointment.paisa, [Validators.required]],

      streetaddress: [this.appointment.streetaddress, [Validators.required]],
      city: [this.appointment.city, [Validators.required]],
      state: [this.appointment.state, [Validators.required]],
      country: [this.appointment.country, [Validators.required]],
      pincode: [this.appointment.pincode, [Validators.required, Validators.pattern("^[0-9]{6}$")]],
    });
  }

  onSubmit() {
    this.fitnessForm.value;
    if (this.fitnessForm.valid) {
      const data = new Fitness(
        this.fitnessForm.value.inr,
        this.fitnessForm.value.paisa,
        this.fitnessForm.value.streetaddress,
        this.fitnessForm.value.city,
        this.fitnessForm.value.state,
        this.fitnessForm.value.country,
        this.fitnessForm.value.pincode,
        this.fitnessForm.value.phonenumber,
        this.fitnessForm.value.email,
        this.fitnessForm.value.firstname,
        this.fitnessForm.value.lastname,
        this.fitnessForm.value.age,
        this.fitnessForm.value.trainerpreference,
        this.fitnessForm.value.physiotherapist,
        this.fitnessForm.value.packages,
        ""
      );

      this.userservice.postfitnessdata(data).subscribe((result) => {
      this.fitnessForm.reset();
      });
    }
  }
}
