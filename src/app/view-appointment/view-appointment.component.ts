import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services";
import { Fitness } from "../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.component.html",
})
export class ViewAppointmentComponent implements OnInit {
  users: Fitness[];

  constructor(private userservice: UserService, private router: Router) {}

  viewAppointment(id) {
    this.router.navigate([`/view/${id}`]);
  }

  deleteAppointment(id){
    let confirmDelete = confirm("Are you sure you want to delete?")
    if(confirmDelete){
      this.userservice.deletefitnessdata(id).subscribe((data) => {
      })
      alert("Appointment has been deleted..")
      window.location.reload();
    }  
  }

  ngOnInit() {
    
    this.userservice.getfitnessdata().subscribe((data) => {
      this.users = [];
      data.forEach((value) => {
        this.users.push(
          new Fitness(
            value.inr,
            value.paisa,
            value.streetaddress,
            value.city,
            value.state,
            value.country,
            value.pincode,
            value.phonenumber,
            value.email,
            value.firstname,
            value.lastname,
            value.age,
            value.trainerpreference,
            value.physiotherapist,
            value.packages,
            value.id
          )
        );
      });
    });
  }
}
