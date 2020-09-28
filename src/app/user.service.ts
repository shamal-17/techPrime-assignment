import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient) { }

  // log in page post api
  
  // public postUser(data):any{

  //   return this.http.post("http://localhost:3000/userData",data);
  //  }

  // log in page get api
  // public getUser(data){
  //   return this.http.get('http://localhost:3000/userData',data);
  // }

  // api for new project list


public getNewIdea(newIdeaDetails):any{
  return this.http.post("http://localhost:3000/tableData",newIdeaDetails);
}

// table get request project list
public tests:string;
public business:string;
public quality:string;
public tdr:string;

public getTable() {
return this.http.get("http://localhost:3000/tableData");
}
}
