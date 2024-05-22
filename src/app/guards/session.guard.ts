import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class SessionGuard {
    constructor(private router: Router) { }

    /**
     *
     * @returns false
     */
    canActivate(): boolean {
        // Verifica la sesión del usuario aquí
        const token = localStorage.getItem('token');

        let isValid;

        if (token) {
            isValid = true;
        } else {
            // No hay un token en el localStorage, el usuario no está autenticado
            alert('Ruta inválida');
            this.router.navigate(['/home']);
            isValid = false;
        }

        return isValid;
    }

    /**
     * Cierra le sesión y borra las llaves almacenadas.
     */
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');

        this.router.navigate(['/logout']);
    }

}
