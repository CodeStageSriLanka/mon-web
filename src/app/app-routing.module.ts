import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LightComponent } from './dashboard/light/light.component';



const routes: Routes = [
                {path: '', component: LightComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
