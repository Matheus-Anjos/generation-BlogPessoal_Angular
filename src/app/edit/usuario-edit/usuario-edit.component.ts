import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Usuario
} from 'src/app/model/Usuario';
import {
  AuthService
} from 'src/app/service/auth.service';
import {
  environment
} from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsuario: string
  idUser: number

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    window.scroll(0, 0);

    if (environment.token == '') {
      alert('sua sessão expirou faça login novamente')
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

  }
  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value

  }
  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp

    });
  }

  atualizar() {
    if (this.usuario.senha != this.confirmarSenha) {
      alert('senhas incorretas')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/inicio'])
        alert('usuário atualizado com sucesso, faça o login novamente')
        environment.token = ''
        environment.foto = ''
        environment.id = 0
        environment.nome = ''
        this.router.navigate(['/entrar'])

      })
    }
  }






}
