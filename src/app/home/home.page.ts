import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSkeletonText,
  IonText,
  IonButton,
  IonCardSubtitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow, IonIcon, IonCol } from '@ionic/angular/standalone';
import { ServiceService } from '../services/service.service';
import { RouterLink } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCol, IonIcon, 
    IonRow,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonCardSubtitle,
    IonButton,
    IonText,
    IonSkeletonText,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ReactiveFormsModule,
    RouterLink,
    DetailsPage,
    FormsModule,
  ],
})
export class HomePage {
  private dataService = inject(ServiceService);

  constructor() {
    this.loadAllUsers();
  }
  allUsers: any = [];
  newid = 0;
  userForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(0),
    email: new FormControl(''),
    address: new FormControl(''),
  });

  async loadAllUsers() {
    this.allUsers = await this.dataService.getAllData();
  }

  async addUser() {
    const data = {
      ...this.userForm.value,
      id: this.newid++,
    };

    console.log(data);

    await this.dataService.addData(data);
    console.log('data Added');
    this.loadAllUsers();
  }

  async deleteUser() {
    console.log('delete start');

    await this.dataService.deleteAll();
    this.loadAllUsers();
    console.log('delete complete');
  }

  async deleteOne(id: any) {
    console.log('delete one process Start');
    await this.dataService.deleteOne(id);

    this.loadAllUsers();
  }
}
