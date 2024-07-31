import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AES,enc } from 'crypto-js';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [FormsModule,CommonModule,NavbarComponent],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {
  
  siteId !: string;
  siteNmae !: string;
  siteUrl !: string;
  siteImgUrl !: string;

  passwordList !: Array<any>;

  email!:string
  username!:string
  password!:string
  passwordId!:string

  formState:string = 'Add New';

  isSuccess:boolean = false;
  successMessage !: string;

  constructor(private route: ActivatedRoute,private passwordManagerService: PasswordManagerService){
    this.route.queryParams.subscribe((val:any)=>{
      //console.log(val);
      this.siteId = val.id;
      this.siteNmae = val.siteName;
      this.siteUrl = val.siteUrl;
      this.siteImgUrl = val.siteImgUrl;    
    })
    this.loadPasswords();
  }

  showAlert(message:string){
    this.isSuccess = true;
    this.successMessage = message;
  }

  resetForm(){
    this.email = "";
    this.username = "";
    this.password = "";
    this.formState = "Add New"
  }

  onSubmit(values:any){
    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;
    console.log(values);
    
    if (this.formState == "Add New") {
      this.passwordManagerService.addPassword(values,this.siteId).then(()=>{
        //console.log('Password Saved Successfully');
        this.showAlert("Data Saved Successfully")
        this.resetForm();
      }).catch((err)=>{
        console.log(err);
      })  
    }
    else if(this.formState == "Edit"){
      this.passwordManagerService.updatePassword(this.siteId,this.passwordId,values).then(()=>{
        //console.log('Password Updated Successfully');
        this.showAlert("Data Updated Successfully")
        this.resetForm();
      }).catch((err)=>{
        console.log(err);
      })  
    }    
  }
  loadPasswords(){
   this.passwordManagerService.loadPasswords(this.siteId).subscribe((val:any)=>{
    this.passwordList = val;
   });
  }

  editPassword(email:string,username:string,password:string,id:string){
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = id;
    this.formState = "Edit";


  }

  deletePassword(passwordId:string){
    this.passwordManagerService.deletePassword(this.siteId,passwordId).then(()=>{
      //console.log("Password deleted successfully");
      this.showAlert("Data deleted Successfully")
    }).catch((err)=>{
      console.log(err);
      
    })
  }

  encryptPassword(password:string){
    const secretKey = 'F914EA46442AE9B3C2C84D5589523'; //search on google secrate key 256 bit
    const encryptedPassword = AES.encrypt(password,secretKey).toString();
    
    return encryptedPassword;
  }
  decryptPassword(password:string){
    const secretKey = 'F914EA46442AE9B3C2C84D5589523'; 
    const decryptedPassword = AES.decrypt(password,secretKey).toString(enc.Utf8);

    return decryptedPassword;
  }

  onDecrypt(password:string,index:number){
    const decryptPassword = this.decryptPassword(password);
    this.passwordList[index].password = decryptPassword;
    
  }
}
