import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  authSubs: Subscription;
  nombre: string;

  constructor(  private authService: AuthService,
                private router: Router, 
                private store: Store<AppState> ) { }

  ngOnInit() {
    this.authSubs =  this.store.select('auth').pipe(
      filter(( { user } ) => user != null)
    )
    .subscribe(( { user } ) => {
        // console.log(user);
        this.nombre = user.nombre;
      }
    )
  }

  ngOnDestroy(): void {
      this.authSubs.unsubscribe();
  }

  logout() {
    this.authService.logout().then(() => 
      this.router.navigate(['/login'])
    )
    
  }

}
