import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class DetailsPage implements OnInit{
  private dataService = inject(ServiceService);
  private router = inject(Router);
  userDetails : any = {};
  allUsers : any = []
  constructor() {
  }
  ngOnInit(): void {
    this.allData()
  }
  @Input() id: number = 0;
  userForm = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(0),
    email: new FormControl(''),

    address: new FormControl(''),
  });

  async updateUser() {
    const data = {
      ...this.userForm.value,
      id: this.id,
    };
    console.log('send data from update data');
``
    await this.dataService.updateData(data);

    console.log('updated data');

    this.router.navigate(['/']);

    // console.log(this.item);
  }

  async allData() {
    this.allUsers = await this.dataService.getAllData();

    console.log(this.allUsers);
    const details = this.allUsers.filter((u:any) => u.id.toString() === this.id.toString());

    this.userDetails = details[0];
    console.log('from details page :',this.userDetails);
    
    
    
  }
}
