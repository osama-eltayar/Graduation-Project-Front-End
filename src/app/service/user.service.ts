import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, pipe, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  public subject;
  public user_id: Number;

  constructor(private http: HttpClient) {
    this.subject = new Subject;
  }

  getUsers(){
    return this.http.get("/api/users");
  }

  register(user: User): Observable<any>{
      return this.http.post("/api/register",user);
  }

  login(user: User): Observable<any>{
    user.device_name="anything";
    return this.http.post("/api/login",JSON.stringify(user)).pipe(tap(ev => {
      this.user = ev;
      const _token = ev.access_token;
      localStorage.setItem('access_token', _token);
      this.subject.next(true);
    }));
  }
  logout(){
    this.http.get('/api/LogoutUser');
    localStorage.removeItem('access_token');
    this.subject.next(false);
  }

  updateUser(userId, user: User): Observable<any> {
    return this.http.put("api/users/"+userId, user)
    .pipe(
      tap(()=>console.log(userId, user))
      ,catchError(this.handleError2<User[]>('updateUser', []))
    );
  }

  loggedIn(){
    if(localStorage.getItem('access_token')){
      return true;
    }
    return false;
  }

  getLoggedInUser(): Observable<any>{
    return this.http.get('/api/LoggedInUser').pipe(map(val=>{
      this.user = val["data"];
      this.user_id = val['id'];
      return val["data"];
    }));
  }

  hasRole()
  {
    if(this.loggedIn())
    {
      if (this.user.role == "admin") return Role.admin;
      else if (this.user.role == "employee") return Role.employee;
      else if (this.user.role == "seeker") return Role.seeker;
    }
  }

  resetPassword(passowrds){
    return this.http.put(`/api/resetpassword/${this.user_id}`,passowrds);
  }

  private handleError2<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error);
    };
  }

}
