import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HODDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/guard/auth-guard.service';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';

const routes: Routes = [
  {path : '' , redirectTo : 'login' , pathMatch : 'full'},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'HOD-dashboard', canActivate : [AuthGuard],component : HODDashboardComponent},
  {path : 'staff-dashboard', canActivate : [AuthGuard], component : StaffDashboardComponent},
  {path : '**', component : NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
