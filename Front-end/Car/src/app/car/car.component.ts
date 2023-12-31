import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarService } from '../car_service//car.service';
import { Car } from '../car_model/carModel';
import { NormalAlertService } from '../alerts/normal-alert.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})


export class CarComponent  implements OnInit {
  cars: Car[] = [];
  editingCar=true;
  pageSize = 5; 
  pageIndex = 0; 
  carForm: any; 
  tableData:any=[]
  pagedTableData:any=[]
  isNewRowAdd=false
  tableHeaders=["carNo","userNo", "arName", "enName",  "cardNo", "beginDate", "endDate", "company", "color", "model"]

  constructor(private carService: CarService,private formBuilder:FormBuilder,private alertService:NormalAlertService,public alertController: AlertController) {

  }

  ngOnInit() {
    this.initializeForm();
    this.fetchCars();
    this.pageChanged(0);
  }
 
  initializeForm(): void {
    this.carForm = this.formBuilder.group({
      userNo: [''],
      arName: ['', Validators.required],
      enName: ['', Validators.required],
      carNo: ['',Validators.required], 
      cardNo: [''],
      beginDate: [''],
      endDate: [''],
      company: [''],
      color: [''],
      model: ['']
    });
  }
  

  editRow(row: any) {
    row.editable = !row.editable;
    if (!row.editable) {
      this.updateCar(row);
  }
}
  updateCar(row: any): void {
    if (row && row.carNo) {
      this.carService.updateCar(row).subscribe(
        (item) => {
          console.log(item,'item')
          this.tableData.forEach((e:Car,index:number)=>{
                if(e.carNo==row.carNo){
                  this.tableData[index]=item
                }
          })
        },
        (error) => {
          console.error('Error updating car:', error);
          this.alertService.showAlert('Error', 'Failed to update car. Please try again later.');
        }
      );
    } else {
      console.error('Invalid row or carNo');
      this.alertService.showAlert('Error', 'Invalid data. Please check the information and try again.');
    }
  }

  deleteRow(index: number, row: Car): void {
    this.showDeleteConfirmation(row)
  }

  addRow(){
    this.isNewRowAdd=true
  }
  
  SaveForm(){
    try {
      if(this.carForm.valid){
        let newCar:Car= {
          userNo: this.carForm.get('userNo').value,
          arName: this.carForm.get('arName').value,
          enName: this.carForm.get('enName').value,
          carNo: this.carForm.get('carNo').value,
          cardNo: this.carForm.get('cardNo').value,
          beginDate: this.carForm.get('beginDate').value,
          endDate: this.carForm.get('endDate').value,
          company: this.carForm.get('company').value,
          color: this.carForm.get('color').value,
          model: this.carForm.get('model').value,
        };
      this.carService.addCar(newCar).subscribe(
        (addedCar) => {
          this.carForm.reset();
          this.fetchCars();
          this.isNewRowAdd=false;
        },
        (error) => {
          console.error('Error adding car:', error);
          this.alertService.showAlert('Error', 'Failed to add a new car. Please try again later.');
        }
      );
      }
    } catch (error) {
      console.error('Error adding car:', error);
      this.alertService.showAlert('Error', 'An unexpected error occurred. Please try again later.');
    }
  }
  fetchCars(): void {
    this.carService.getAllCars().subscribe(
      (cars) => {
        if (cars && cars.length > 0) {
          this.tableData = cars;
          this.pageChanged({pageIndex:0})
        } else {
          console.warn('No cars found');
          this.tableData = [];
        }
      },
      (error) => {
        console.error('Error fetching cars:', error);
        this.alertService.showAlert('Error', 'Failed to fetch cars. Please try again later.');
      }
    );
  }

  cancelEdit() {
    this.editingCar = false;
  }

  
  pageChanged(event: any) {
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize ;
    const endIndex = startIndex + this.pageSize;
    this.pagedTableData = this.tableData.slice(startIndex, endIndex);
  }

  originalOrder = (a: any, b: any): number => {
    return 0;
  }

  async showDeleteConfirmation(itemId: Car) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Deletion canceled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteConfirmRowItem(itemId)
          },
        },
      ],
    });
  
    await alert.present();
  }
  deleteConfirmRowItem(row:Car){
    if (row && row.carNo) {
      this.carService.deleteCar(row).subscribe(
        () => {
          this.fetchCars();
        },
        (error) => {
          console.error('Error deleting car:', error);
          this.alertService.showAlert('Error', 'Failed to delete car. Please try again later.');
        }
      );
    } else {
      console.error('Invalid row or carNo');
      this.alertService.showAlert('Error', 'Invalid data. Please check the information and try again.');
    }
  }
 
}
