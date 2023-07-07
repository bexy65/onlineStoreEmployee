import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api/apiservice.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent {
  selectedAge: number;
  ages: number[];
  userForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private api : ApiService, private router: Router) {
    
    this.ages = Array.from({ length: 70 - 18 + 1 }, (_, i) => i + 18);
    this.userForm = this.formBuilder.group({
      firstName : new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
      lastName: new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
      profession: new FormControl('', Validators.pattern('^[a-zA-Z]+$')),
      gender: '',
      age: ''
    })
  }
  
  submitForm () {
    if(this.userForm.valid) {
      this.api.addUser(this.userForm.value).subscribe({
        next: (value:any) => {
          alert('User has been added successfully!');
          this.router.navigate(['/']);
        },
        error: (err:any) => {
          //should add alert for customer on error
          console.error(err);
        }
      })
    }
  }
}
