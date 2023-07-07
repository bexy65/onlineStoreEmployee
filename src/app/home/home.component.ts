import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api/apiservice.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private api: ApiService) {}

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
}
