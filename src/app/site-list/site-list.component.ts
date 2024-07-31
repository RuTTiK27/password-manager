import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,NavbarComponent],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {
  
  allSites !:Observable<Array<any>>;
  siteName !:string;
  siteUrl !: string;
  siteImgUrl !:string;
  siteId !: string;

  formState:string = "Add New"

  isSuccess:boolean = false;
  successMessage !: string;

  constructor(private passwordManagerService:PasswordManagerService){
    this.loadSites();
  }

showAlert(message:string){
  this.isSuccess = true;
  this.successMessage = message;
}

onSubmit(values:object){
  if (this.formState == "Add New") {
    this.passwordManagerService.addSite(values).then(()=>{
      //console.log('Data Saved Successfully');
      this.showAlert("Data Saved Successfully");
    }).catch(err=>{
      console.log(err);
    })
  }
  else if(this.formState == "Edit"){
    this.passwordManagerService.updateSite(this.siteId,values).then(()=>{
      //console.log('Data Updated Successfully');
      //this.isSuccess = true;
      this.showAlert("Data Edited Successfully");
    }).catch(err=>{
      console.log(err);
    })
  }
}
loadSites(){
  this.allSites = this.passwordManagerService.loadSites();
}
editSite(siteName:string,siteUrl:string,siteImgUrl:string,id:string){
  this.siteName = siteName;
  this.siteUrl = siteUrl;
  this.siteImgUrl = siteImgUrl;
  this.siteId = id;
  this.formState = "Edit";
}
deleteSite(id:string){
this.passwordManagerService.deleteSite(id).then(()=>{
  //console.log('Site Deleted Successfully');
  //this.isSuccess = true;
  this.showAlert("Data Deleted Successfully");

}).catch(err=>{
  console.log(err);
})
}
}
