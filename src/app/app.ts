import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  showform: boolean = false;
  
  showForm(){
    this.showform=false;
  }
  showMain(){
    return this.showform= true;
  }
}
