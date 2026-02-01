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
  showinput: boolean = true;

  /**
   * Usuarios disponibles para iniciar sesión
   */

  users=[
    {id:0,username:'admin', password:'admin'},
    {id:1,username:'user1', password:'1'},
    {id:2,username:'user2', password:'2'}
  ];
  loggeduser: any = null;

  date = new Date();
  alldate = this.date.toLocaleDateString('es-ES');

  /**
   * Horas disponibles para reservar citas
   */

  hours=[
    {time:'09:00', service:'tijeras',reserved:false, userid:null},
    {time:'10:00', service:'tijeras',reserved:true, userid:1},
    {time:'11:00', service:'tijeras',reserved:false, userid:null},
    {time:'12:00', service:'tijeras',reserved:false, userid:null},
    {time:'13:00', service:'tijeras',reserved:true, userid:null},
    {time:'14:00', service:'tijeras',reserved:false, userid:null},
    {time:'09:00', service:'barba',reserved:true, userid:1},
    {time:'10:00', service:'barba',reserved:false, userid:null},
    {time:'11:00', service:'barba',reserved:false, userid:null},
    {time:'12:00', service:'barba',reserved:true, userid:2},
    {time:'13:00', service:'barba',reserved:false, userid:null},
    {time:'14:00', service:'barba',reserved:false, userid:null},
  ];

  /**
   * Metodos para mostrar y ocultar formularios y horarios
   */
  showForm(){
    this.showform=false;
    this.showScheduleScissors=false
    this.showScheduleBeard=false;
    this.showinput=false;
  }
  showMain(){
    this.showform= true;
    this.showScheduleScissors=false;
    this.showScheduleBeard=false;
    this.showinput=true;

  }
  showSchedule1(){
    this.showScheduleScissors=true;
    this.showScheduleBeard=false;
  }
  showSchedule2(){
    this.showScheduleBeard=true;
    this.showScheduleScissors=false;
  }

  /**
   * Metodos para filtrar las horas por servicio
   * @returns deuelve las horas filtradas por servicio
   */

  getScissorsHours(){
    return this.hours.filter(h => h.service === 'tijeras');
  }
  getBeardHours(){
    return this.hours.filter(h => h.service === 'barba');
  }
  /**
   * Metodo para iniciar sesión y guardar el usuario en localStorage
   * @param username username que obtenemos desde el formulario
   * @param password password que obtenemos desde el formulario
   */

  login(username:string, password:string){
    const user=this.users.find(u => u.username === username && u.password === password);
    if(!user){
      alert("Credenciales incorrectas");
      return;
    }
    this.loggeduser=user;
    localStorage.setItem('user', JSON.stringify(user));
    this.showMain();
  }
  /**
   * Metodo para seleccionar una hora y reservar o cancelar la cita
   * @param hour la hora seleccionada para la reserva de la cita
   */

  selectHour(hour:any){
    if(!this.loggeduser){
      alert("Inicia sesion para reservar una cita");
      return;
    }
    if(hour.userid === this.loggeduser.id){
      hour.reserved=false;
      hour.userid=null;
      localStorage.setItem('hours', JSON.stringify(this.hours));
      return;
    }

    const hasReservation=this.hours.some(h => h.userid === this.loggeduser.id);
    if(hasReservation){
      alert("Ya tienes una cita reservada");
      return;
    }
    hour.reserved=true;
    hour.userid=this.loggeduser.id;
  }

  /**
   * Metodo para cargar los datos del usuario y las horas reservadas desde localStorage al iniciar la aplicacion
   */

  ngOnInit(){
    const user=localStorage.getItem('user');
    const hours=localStorage.getItem('hours');
    if(user){
      this.loggeduser=JSON.parse(user);
    }
    if(hours){
      this.hours=JSON.parse(hours);
    }
  }
}
