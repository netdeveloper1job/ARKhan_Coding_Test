import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthState, clearToken } from '../core/auth';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feature',
  imports: [CommonModule ,RouterModule, RouterOutlet],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss'
})
export class FeatureComponent {
  private store = inject(Store<{ auth: AuthState }>);
  isAuthenticated$!: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select('auth').pipe(
      map(authState => !!authState.token)
    );
  }

  logout(){
    this.store.dispatch(clearToken());
    this.router.navigate(['/login']);
  }
}
