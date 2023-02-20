import { Component,  OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HodService } from '../shared/services/Hod.service';
import { StaffService } from '../shared/services/staff.service';

@Component({
  selector: 'app-hod-dashboard',
  templateUrl: './hod-dashboard.component.html',
  styleUrls: ['./hod-dashboard.component.css']
})
export class HODDashboardComponent implements OnInit, OnDestroy{
  
  constructor(private staffServ : StaffService,private HodServ : HodService){}
  
  
  noLeave: boolean = false
  object: any;
  arr: any[] =[];
  clicked : boolean = false
  private unsubscribe$ = new Subject<void>()

  ngOnInit(){
    this.staffServ.getstaffObj().pipe(takeUntil(this.unsubscribe$)).subscribe((responce) => {
      let obj: any
      if (localStorage.getItem('id')) {
        obj = responce.find(ele => `"${ele.id}"` === localStorage.getItem('id'))
      }
      this.object = obj
    })
  
    this.staffServ.getStaffL().pipe(takeUntil(this.unsubscribe$)).subscribe((res)=>{
      if(res.length === 0 ){
        this.noLeave = true
      }else{
        res.forEach(obj => {
          if(obj.department === this.object.department){
           this.arr.push(obj)
          }
        })
        console.log(this.arr)
      }
    })
  }
 
  
  ApproveClick(obj : any){
    console.log(obj)
    if(obj){
      obj.ApBtn = "Approved"
      obj.status = 'Approved'
      this.clicked = true
      this.HodServ.patchDta(obj).pipe(takeUntil(this.unsubscribe$)).subscribe((data:any)=>{
        console.log(data)
      })
    }
  }

  RejectClick(obj : any){
    if(obj){
      obj.RjBtn = "Rejected"
      obj.status = 'Rejected'
      this.clicked = true
      this.HodServ.patchDta(obj).pipe(takeUntil(this.unsubscribe$)).subscribe((data:any)=>{
        console.log(data)
      })
    }
  }



  ngOnDestroy(): void {
   this.unsubscribe$.next()
   this.unsubscribe$.complete()
  }

}
