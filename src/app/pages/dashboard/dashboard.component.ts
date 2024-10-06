import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit,inject } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Constant } from '../../conststnt';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  http= inject(HttpClient);
  userList: any[]= [];
  decriptedName: string = '';

  ngOnInit(): void {
    this.getAllUser();
    const uName = localStorage.getItem('uName');
    debugger;
    if(uName != null) {
      this.decriptedName = this.decriptData(uName);
    }
   
  }

  decriptData(data: string) {
    const decriptVal = CryptoJS.AES.decrypt(data,Constant.EN_KEY);
    return decriptVal.toString(CryptoJS.enc.Utf8);
  }

  getAllUser() {
    debugger;
    this.http.get("https://freeapi.miniprojectideas.com/api/User/GetAllUsers").subscribe((Res:any)=>{
      this.userList  = Res.data;
    })
  }

}
