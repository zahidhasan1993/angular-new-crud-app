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
export class DetailsPage implements OnInit {
  private dataService = inject(ServiceService);
  private router = inject(Router);
  userDetails: any = {};
  allUsers: any = [];

  constructor() {}

  ngOnInit(): void {
    this.allData();
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

    try {
      await this.dataService.updateData(data);
      console.log('Updated data');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error updating data:', error);
    
    }
  }

  async allData() {
    this.allUsers = await this.dataService.getAllData();

    const details = this.allUsers.filter((u: any) => u.id.toString() === this.id.toString());

    if (details.length > 0) { 
      this.userDetails = details[0];
      this.userForm.patchValue(this.userDetails); 
    } else {
      console.log("some error!");
      
     
    }
  }
}
