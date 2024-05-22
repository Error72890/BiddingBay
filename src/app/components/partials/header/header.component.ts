import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [SessionGuard]
})
export class HeaderComponent {

  userId: number = 0;
  userSesion: string | null = localStorage.getItem('token');

  constructor(private sessionGuard: SessionGuard, private router: Router, private route: ActivatedRoute) {
    /**
     * Obtiene la bandera de sesion para mostrar el contenido adecuado en el header al actualizar.
    */
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        this.userId = parseInt(localStorage.getItem('userId')!);
      }
    });
  }

  closeSession() {
    this.sessionGuard.logout();
  }
}
