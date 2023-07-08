import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../api/apiservice.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../services/snack-bar.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private api: ApiService, private router: Router, private snackBar: SnackBarService) {}
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

  massageDeleteSuccessfully: string = 'User DELETED successfully!';
  massageFromServerLoad: string = 'Error on loading data from server, please try again later!';
  massageFromServerDelete: string = 'Error on deleting data, please try again later!';
  action: string = 'Close';
  
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
        this.snackBar.showSnackbar(this.massageFromServerLoad, this.action);
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
        this.snackBar.showSnackbar(this.massageDeleteSuccessfully, this.action);
      },
      error:(err:any) => {
        console.log(err);
        this.snackBar.showSnackbar(this.massageFromServerDelete, this.action);
      }
    })
  }
}
