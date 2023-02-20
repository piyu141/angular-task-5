import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  @Output()sendTo = new EventEmitter()

  myLoginForm: FormGroup | any;
  private unsubscribe$ = new Subject<void>()

  constructor(private httpServ : HttpService,private router : Router) { }

  ngOnInit(): void {
    this.myLoginForm = new FormGroup({
      Username: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    })
  }

  onLogin() {
    let object = this.myLoginForm.value
    this.httpServ.getObj().pipe(takeUntil(this.unsubscribe$)).subscribe((resData :any)=>{
          let id = '';
          for(let key in resData){
              if(object.Username === resData[key].userName && object.Password === resData[key].Password && resData[key].post === 'HOD'){
                 localStorage.setItem('id' , JSON.stringify(key));
                  id = key;
                  alert("Login Successfull")
                  this.router.navigate(['/HOD-dashboard'])
                  
              }else if(object.Username === resData[key].userName && object.Password === resData[key].Password && resData[key].post === 'Staff'){
                  localStorage.setItem('id' , JSON.stringify(key));
                  id = key;
                  alert("Login Successfull")
                  this.router.navigate(['/staff-dashboard'])
              }
          }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
   }
}


