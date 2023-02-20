import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class StaffService {
  constructor(private http: HttpClient) { }
  DataBaseUrl2 = "https://angular-task-5-8f34b-default-rtdb.asia-southeast1.firebasedatabase.app/leave.json"
  DataBaseUrl = "https://angular-task-5-8f34b-default-rtdb.asia-southeast1.firebasedatabase.app/HOD.json"


  getStaffL() {
    return this.http.get(this.DataBaseUrl2).pipe(map((data: any) => {
      const Arr: any[] = [];
      for (let key in data) {
        Arr.push({ ...data[key],id : key})
      }
      return Arr
    }))
  }

  postLeave(staff: any) {
    return this.http.post(this.DataBaseUrl2, staff)
  }

  getstaffObj() {
   const getdata = this.http.get(this.DataBaseUrl).pipe(map((res: any) => {
      const Arr = [];
      for (let key in res) {
       Arr.push({ ...res[key], id: key })
      }
      return Arr

    }))
    return getdata
  }
}
