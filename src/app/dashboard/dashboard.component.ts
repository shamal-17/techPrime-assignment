import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Chart } from 'chart.js';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

// sample dropdown

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  result: [];

// table data
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  chart: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  opened:true;

  // hide and show
  showDiv = {
    previous : false,
    current : false,
    next : false
  }

  constructor( private formBuilder: FormBuilder, private router:Router, private http:HttpClient, private UserService:UserService) { }

  ngOnInit() {


          this.chart = new Chart('canvas', {
            type: 'doughnut',
            data: {
              labels: ['Data1','Data2','data3','data4'],
              datasets: [
                { 
                  data: [25,15,30,30],
                  backgroundColor: ['rgba(255, 0, 0, 1)','rgba(255, 0, 0, 0.1)','rgba(255,0,1,1)'],
                  fill: false
                },
              ]
            },
            options: {
              legend: {
                display: false
              },
              tooltips:{
                enabled:false
              }
            }
          });


      // pie 

          this.chart = new Chart('canvasbar', {
            type :'bar',
            data: {
              labels: ["Instacia 1", "Instacia 2", "Instacia 3", "Instacia 4", "Instacia 5", "Instacia 6", "Instacia 7"],
              datasets: [   
                
                {
                  label: "Maximo",
                  data: [165, 159, 180, 181, 156, 155, 140],
                  borderColor:'#eddb1c',
                  backgroundColor:'#FFF3D6',
                  fill: false
                },
                {
                  label: "Promedio",
                  data: [115, 109, 130, 131, 106, 105, 90],
                  borderColor:'#FF7A96',
                  backgroundColor:'#EAC3CC',
                  fill: false
                },
                {
                  label: "Minimo",
                  data: [65, 59, 80, 81, 56, 55, 40],
                  borderColor:'#4BB7FF',
                  backgroundColor:'#CDEBFF',
                  fill: false
                }
                ,{
                  label: "Error",
                  data: [65, 59, 80, 81, 56, 55, 40],
                  borderColor:'#FF7A96',
                  borderWidth: 1,
                  backgroundColor:'#EAC3CC'
                },
                {
                  label: "NOK",
                  data: [5, 9, 10, 11,6, 5, 10],
                  borderColor:'#4BB7FF',
                  borderWidth: 1,
                  backgroundColor:'#CDEBFF'
                },
                {
                  label: "PROCESING",
                  data: [51, 19, 110, 111,16, 15, 110],
                  borderColor:'#FFD36C',
                  borderWidth: 1,
                  backgroundColor:'#FFF3D6'
                }
              ]
            }
          });

   // project details table
    this.UserService.getTable().subscribe((data) => {
      console.log('Result - ', data);
      console.log('data is received');
    })

    this.registerForm = this.formBuilder.group({
      projectTheme: ['', Validators],
      roots: ['', Validators],
      type: ['', Validators],
      division:['', Validators],
      category: ['', Validators],
      m: ['', Validators],
      department: ['', Validators],
      businessPlan: ['', Validators],
      location: ['', Validators],
      projectNeed: ['', Validators]
  });

  }
  
// get form data for new isdea list
  public getNewIdea(data):any{
    this.UserService.getNewIdea(data).subscribe(res=>{
      this.result = res;
  },(err:HttpErrorResponse)=>{
      if(err.error instanceof Error){
          console.log("Client Side Error !");
      }else{
          console.log("Server Side Error !");
      }
  });
}

}
