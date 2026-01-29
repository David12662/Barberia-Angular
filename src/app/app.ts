import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  showform: boolean = true;
  showScheduleScissors: boolean= false;
  showScheduleBeard: boolean = false;
  
  showForm(){
    this.showform=false;
    this.showScheduleScissors=false
    this.showScheduleBeard=false;
  }
  showMain(){
    this.showform= true;
    this.showScheduleScissors=false;
    this.showScheduleBeard=false;

  }
  showSchedule1(){
    this.showScheduleScissors=true;
    this.showScheduleBeard=false;
  }
  showSchedule2(){
    this.showScheduleBeard=true;
    this.showScheduleScissors=false;
  }

}
