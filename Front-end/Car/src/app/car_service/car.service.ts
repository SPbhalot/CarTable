// car.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Car } from '../car_model/carModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:5000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/cars`, car)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/cars/update`, car)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCar(car: Car): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cars/delete`,car)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
      return throwError('Something went wrong on the client side. Please try again later.');
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );
      return throwError('Something went wrong on the server side. Please try again later.');
    }
  }

}
