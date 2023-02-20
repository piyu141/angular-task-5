import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class AuthGuard implements CanActivate{
    constructor(private router : Router){}
    canActivate(route : ActivatedRouteSnapshot,state : RouterStateSnapshot):Promise<boolean> | Observable<boolean> | boolean{
        if(localStorage.getItem('id') === null){
            this.router.navigate(['login'])
            return false
        }else{
            return true
        }
    }

}  