import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { CarComponent } from '../car/car.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  
  imports: [RouterModule.forChild(routes),IonicModule,],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
