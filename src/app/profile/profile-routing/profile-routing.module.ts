import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile.component';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';

const routes: Routes = [
  {
    path: ':profileId',
    component: ProfileComponent,
    },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
