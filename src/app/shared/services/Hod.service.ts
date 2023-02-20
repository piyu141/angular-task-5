import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"



@Injectable({
    providedIn: 'root'
  })
  
  export class HodService {

    constructor(private http: HttpClient) { }
    
  DataBaseUrl2 = "https://angular-task-5-8f34b-default-rtdb.asia-southeast1.firebasedatabase.app/leave.json"
  DataBaseUrl = "https://angular-task-5-8f34b-default-rtdb.asia-southeast1.firebasedatabase.app/HOD.json"

  id : any;
  
  patchDta(obj : any){
    console.log(obj)
    this.id = obj.id 
    console.log(obj.id)
    this.http.patch('https://angular-task-5-8f34b-default-rtdb.asia-southeast1.firebasedatabase.app/leave/'+ obj.id +'.json',obj)
  }

}