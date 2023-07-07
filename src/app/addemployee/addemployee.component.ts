import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api/apiservice.service';
import { dataModal } from '../home/dataModal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent {
  selectedAge: number;
  ages: number[];
  userForm: FormGroup;
  validateString = new FormControl('', Validators.pattern('^[a-zA-Z]+$'));
  userId!: number;
  isUpdate: boolean = false;
  
  
  constructor(private formBuilder: FormBuilder, private api : ApiService, private router: Router, private activatedRoute: ActivatedRoute) {
    
    this.ages = Array.from({ length: 70 - 18 + 1 }, (_, i) => i + 18);
    this.userForm = this.formBuilder.group({
      firstName : new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
      lastName: new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
      profession: new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
      gender: new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
      age: ''
    })

      this.activatedRoute.params.subscribe((val) => {
      this.userId = val['id'];
      this.api.fetchUserData(this.userId).subscribe({
        next: (res) => {
          this.isUpdate = true;
          this.valueFormChange(res);
        },
        error: console.log
      })
    })
  }

  submitForm () {
    if(this.userForm.valid) {
      this.api.addUser(this.userForm.value).subscribe({
        next: (value:any) => {
          alert('User has been added successfully!');
          console.log(value);
          this.router.navigate(['/']);
        },
        error: (err:any) => {
          //should add alert for customer on error
          console.error(err);
        }
      })
    }
  }

  update() {
    this.api.updateUser(this.userForm.value, this.userId).subscribe({
      next: (value:any) => {
        alert('User has been updated successfully!');
        console.log(value);
        this.router.navigate(['/']);
      },
      error: (err:any) => {
        //should add alert for customer on error
        console.error(err);
      }
    })
  }

  
  valueFormChange(data: dataModal) {
    this.userForm.setValue({
      firstName : data.firstName,
      lastName: data.lastName,
      profession: data.profession,
      gender: data.gender,
      age: data.age
    });
    
  }

   
}
