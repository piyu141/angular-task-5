import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";



@Injectable({
  providedIn: 'root'
})

export class HttpService {
  
  DataBaseUrl = "https://angular-task-5-8f34b-default-rtdb.asia-southeast1.firebasedatabase.app/HOD.json"
  

  constructor(private http: HttpClient) { }

  object : any;  


  postObj(data: any) {
    return this.http.post(this.DataBaseUrl,data)
  }

  getUserObj() {
    return this.http.get(this.DataBaseUrl).pipe(map((catchedData: any) => {
      const myArr: any[] = [];
      for (let key in catchedData) {
        myArr.push({ ...catchedData[key] })
      }
      return myArr
    }))
  }
  getObj(){
    return this.http.get(this.DataBaseUrl)
  }
}
