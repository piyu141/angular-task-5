import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  registrationForm: FormGroup | any;
  depart: string[] = ["sales", "mechanical"]
  members: string[] = ["HOD", "Staff"]
  private unsubscribe$ = new Subject<void>()


  constructor(private httpServ: HttpService) {
  }
 
  ngOnInit() {
    this.registrationForm = new FormGroup({
      post: new FormControl("", Validators.required),
      fName: new FormControl("", Validators.required),
      lName: new FormControl("", Validators.required),
      emailId: new FormControl("", Validators.required),
      contact: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      userName: new FormControl("", Validators.required),
      Password: new FormControl("", Validators.required),
    })
  }

  get formError() {
    return this.registrationForm.controls;
  }

  onRegister() {
    let object = this.registrationForm.value
    let department = object.department;
    if (object.post === 'HOD') {
      this.httpServ.getUserObj().pipe(takeUntil(this.unsubscribe$)).subscribe((returndata: any) => {
        let departments: any[] = []
        for (let key in returndata) {
          departments.push(returndata[key].department)
        }
        if (departments.includes(department)) {
          alert(`HOD of ${object.department} department is present`)
        } else {
          this.httpServ.postObj(object).pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
            alert(`Registration Successfull....${object.fName} ${object.lName} now you can Login`)
          })
        }
    })
    
  }else if (object.post === 'Staff') {
    this.httpServ.postObj(object).pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
      alert(`Registration Successfull....${object.fName} ${object.lName} now you can Login`)
    })
   }

  this.registrationForm.reset()

}

ngOnDestroy(): void {
  this.unsubscribe$.next()
  this.unsubscribe$.complete()
}
}

