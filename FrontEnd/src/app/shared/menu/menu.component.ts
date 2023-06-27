import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEstudiante } from 'src/app/interface/iestudiante';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() idMalla!: number;
  @Input() idUsuario!: number;
  @Input() idDecano?:number;
  
  @Input() rol!:string;
  Admin:string="Admin"
  usuario:string="usuario"
  

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  malla() {
    
    this.router.navigate(['/malla', this.idMalla])

  }
  mallaGeneral(){
    this.router.navigate(['/malla-general',this.idMalla])
  }
  inicio() {   

    this.router.navigate(['/inicio', {idUsuario:this.idUsuario,rol:this.rol}])
  }

  addCarrera(){
    this.router.navigate(['/add-carrera',this.idDecano])
    
  }
}
