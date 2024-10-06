import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { Constant } from '../../conststnt';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  logiObj: any = {
    "EmailId": "",
    "Password": ""
  };

  http= inject(HttpClient);
  router = inject(Router);

  encriptData(data: any) {
    return CryptoJS.AES.encrypt(data,Constant.EN_KEY).toString();
  }

  onLogin() {
    debugger;
    this.http.post("https://freeapi.miniprojectideas.com/api/User/Login",this.logiObj).subscribe((res:any)=>{
      if(res.result) {
        alert("Login Success");
        const enrUserName =  this.encriptData(this.logiObj.EmailId);
        localStorage.setItem("uName",enrUserName);
        localStorage.setItem('angular18Token',res.data.token);
        this.router.navigateByUrl('dashboard')
      } else {
        alert(res.message)
      }
    })
  }
}
