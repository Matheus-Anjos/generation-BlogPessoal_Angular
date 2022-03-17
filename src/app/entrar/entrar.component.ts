import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()



  constructor(private auth: AuthService, private router : Router) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  Entrar() {
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp

        environment.foto = this.userLogin.foto
        environment.nome = this.userLogin.nome
        environment.id = this.userLogin.id
        environment.token= this.userLogin.token
        environment.tipo = this.userLogin.tipo

        this.router.navigate(['/inicio'])
      },
      error: erro => {

        if (erro.status == 401 || erro.status == 400 || erro.status == 500) {
          alert('Usuario ou senha inválidos ')
        }
      }
    })
  }
}
