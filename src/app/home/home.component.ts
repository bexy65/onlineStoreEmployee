import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api/apiservice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private api: ApiService, private router: Router) {}

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'age',
    'profession',
    'gender',
    'action'
  ];
  dataSource !: MatTableDataSource<any>;
  
  
  
  ngOnInit(): void {
      this.getUserList();
  }

  getUserList() {
    this.api.getUser().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
  updateUser(id:number) {
    this.router.navigate(['update', id]);
  }

  deleteUser(id:number) {
    this.api.deleteUser(id).subscribe({
      next: (res) => {
        this.getUserList();
      },
      error: console.log,
    })
  }
}
