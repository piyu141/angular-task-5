import {Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from '../shared/services/http.service';
import { StaffService } from '../shared/services/staff.service';


@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit,OnDestroy {
  constructor(private staffServ: StaffService, private HttpServ: HttpService) { }

 

  staffLeaveForm: FormGroup | any;
  date = new Date()
  leaveList !: any;
  object: any;
  arr: any[] =[];
  noLeave :boolean = false;
  ApprovedArr :any[] = []
  RejectedArr :any[] = []
  private unsubscribe$ = new Subject<void>()



  ngOnInit(): void {
    this.staffLeaveForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      ReasonText: new FormControl('', Validators.required),
    })

    this.staffServ.getstaffObj().pipe(takeUntil(this.unsubscribe$)).subscribe((responce) => {
      let obj: any
      if (localStorage.getItem('id')) {
        obj = responce.find(ele => `"${ele.id}"` == localStorage.getItem('id'))
      }
      this.object = obj
    })

    this.staffServ.getStaffL().pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if(res.length === 0 ){
        this.noLeave = true
      }else{
        res.filter(obj =>{
          if(obj.department === this.object.department && obj.fName === this.object.fName){
           this.arr.push(obj)
           if(obj.department === this.object.department && obj.fName === this.object.fName && obj.status === 'Approved'){
            this.ApprovedArr.push(obj)
           }else if(obj.department === this.object.department && obj.fName === this.object.fName && obj.status === 'Rejected'){
            this.RejectedArr.push(obj)
           }
          }
        })
      }
    });
  }


  LeaveSubmit() {
    let day1: Date = new Date(this.staffLeaveForm.value.startDate);
    let day2: Date = new Date(this.staffLeaveForm.value.endDate);
    let timeDiff = day2.getTime() - day1.getTime();
    let dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));

    let LeaveObj = {
      fName: this.object.fName,
      department: this.object.department,
      lName: this.object.lName,
      post: this.object.post,
      startDate: this.staffLeaveForm.value.startDate,
      endDate: this.staffLeaveForm.value.endDate,
      ReasonText: this.staffLeaveForm.value.ReasonText,
      duration: dayDiff,
      status : 'Pending',
      ApBtn : "Approve",
      RjBtn : "Reject"
    }
    this.staffServ.postLeave(LeaveObj)
    this.staffLeaveForm.reset()

  }

  
  ngOnDestroy(): void {
    this.arr.length  === 0
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }


}

