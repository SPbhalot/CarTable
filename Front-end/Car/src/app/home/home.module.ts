import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CarComponent } from '../car/car.component';
import { HttpClientModule } from '@angular/common/http';
import { CarService } from '../car_service/car.service';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage,CarComponent],
  providers:[CarService]
})
export class HomePageModule {}
