import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';
import { Role } from './models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private userService: UserService
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.userService.loggedIn()) {
          this.router.navigate(['login']);
          return false;
      }

      const role = route.data.role as Role;
      if (role && !this.userService.hasRole()) {
          this.router.navigateByUrl('/error404');
          return false;
      }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.userService.loggedIn()) {
          return false;
      }
      const role = route.data.role as Role;
      if (role && !this.userService.hasRole()) {
          return false;
      }
    return true;
  }
}