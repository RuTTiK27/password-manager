# Angular Password-Manager

Steps to create app

# Steps to create app

1. Everyone should know this things before jump into:
    1. Open any terminal or command prompt.
    2. Redirect to your projects folder or where you want to create you angular project.
2. Create new app by command **ng** **new** [APP NAME]  

```
>ng new Password-Manager
```

1. Open app in Visual Studio Code by command **code .**

```
>code .
```

1. Configure your project add necessary packages or libraries that you want to use. Here we are taking an example of tailwind CSS that we are going to use in our project. (Tailwind will helps us in designing)
    1. Go to [Install Tailwind CSS with Angular - Tailwind CSS | https://tailwindcss.com/docs/guides/angular](https://tailwindcss.com/docs/guides/angular)
    2. Steps are written there so you will get idea. Even though I am listing the steps, you should still go there and follow them.
    3. **Install Tailwind CSS**
    
    ```
    >npm install -D tailwindcss postcss autoprefixer
    >npx tailwindcss init
    ```
    
    d. **Configure your template paths**
    
    ```
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    **content: [
    "./src/**/*.{html,ts}",
    ],**
    theme: {
    extend: {},
    },
    plugins: [],
    }
    ```
    
    e. **Add the Tailwind directives to your CSS**
    
    styles.css
    
    ```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    
2. After adding necessary packages and library Run your build process with **`ng serve`**.
3. We are going to use firebase as database so next we have to install that, So for installing firebase to your angular project follow steps.
    1. Go to [firebase.google.com](http://firebase.google.com) 
    2. Click on  **Go to console** 
    3. Add project
    4. Enter project name in our case **`password-manager`. Continue further like accepting terms & conditions.**
    5. Select **test mode. and create the** database**.**
    6. So now back to vs code we have to add **angular fire package** in our project so follow below commands to install angular fire package.
        1. ng add **`@angular/fire`**
        2. Select necessary things in our case we are going to use **`Authentication`** and **`Firestore`. (For selecting use space)**
        3. Select account that you are going to use.
        4. Create NEW APP or if you have already created then just use it. give it name **`password-manager`.**
4. We are completed with installing necessary things. so now lets generate the all required **components** and **service files**.
5. For this application we required:
    1. **Navbar** Component - For Navbar
    2. **Site List** Component - For list of sites
    3. **Password List Component** - For list of password management 
    4. **Login Component** - For login page
6. So for generating component use command: ng generate component [COMMPONENT NAME].
    
    ```
    #Short hand notation for - ng generate component
    >ng g c navbar 
    >ng g c site-list
    >ng g c password-list
    >ng g c login 
    ```
    
7. For generating service file use command: ng generate service [SERVICE NAME}.

```
#Short hand notation for - ng generate service
>ng g s password-manager
```

1. So now lets create design so for designing we are going to use fully tailwind css so no need to write any custom css.
2. Open **navbar.component.html** file and add this markups.
    1. routerLink will be discussed later in this chapter so don’t worry about that. 
    
    ```html
    <nav class="bg-white border-2 border-gray-900 px-2 py-3 rounded shadow-md">
        <div class="container flex flex-wrap items-center justify-between mx-auto">
            <span class="self-center text-xl font-semibold">Octaacedemy Password M.</span>
            <button class="text-white bg-gray-900 rounded-lg text-sm px-5 py-3" routerLink="/">Logout</button>
        </div>
    </nav>
    ```
    
3. So now we have to add this component in our **app.component.html** file. So open and put following line to add.
    
    ```html
    <app-navbar></app-navbar>
    
    <router-outlet></router-outlet> 
    <!-- at the end of the day we have to put this **router-outlet** so you can 
    view the current route. but for checking you can add direct <APP-COMPONENT> -->
    ```
    
4. Now open **site-list.component.html** file for designing site list.

```html
<app-navbar></app-navbar>
<div class="container mx-auto my-16">
    <h1 class="text-5xl mt-0 mb-5">Octaacedemy Password Manager</h1>
    <p class="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eaque facilis nostrum quae exercitationem animi, perferendis quaerat iure aut maxime officiis fugit qui nobis quibusdam a, odio aliquid natus sunt?</p>
    <button class="mb-5 mx-0.5 px-5 py-3 text-sm bg-gray-900 text-white shadow rounded-sm">
        Add New Site
    </button>

    <!-- alert -->
     <div *ngIf="isSuccess" class="p-5 my-3 bg-teal-100 text-teal-900">
        {{successMessage}}
     </div>

<!-- Add New Site Form -->

<div class="px-20 py-10 mb-10 my-5 border-4 border-gray-900">
    <h2 class="text-3xl text-center">{{formState}} Site</h2>
    <p class="text-center">You can {{formState}} site from the below form</p>
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
        <div class="flex flex-col">
            <label for="" class="text-lg font-medium mb-2">Site Name</label>
            <input [(ngModel)]="siteName" name="siteName" type="text" class="border-2 border-gray-900 p-2 rounded-lg w-full">
        </div>
        <div class="flex flex-col">
            <label for="" class="text-lg font-medium mb-2">Site URL</label>
            <input [(ngModel)]="siteUrl" name="siteUrl" type="text" class="border-2 border-gray-900 p-2 rounded-lg w-full">
        </div>
        <div class="flex flex-col">
            <label for="" class="text-lg font-medium mb-2">Site Image URL</label>
            <input [(ngModel)]="siteImgUrl" name="siteImgUrl" type="text" class="border-2 border-gray-900 p-2 rounded-lg w-full">
        </div>

        <button class="mt-10 mx-0.5 px-5 py-3 text-sm bg-gray-900 text-white shadow rounded-md">
            {{formState}} Site
        </button>

        <button class="mt-10 mx-0.5 px-5 py-3 text-sm border-2 border-gray-900 text-gray-900 shadow rounded-md">
            Cancel
        </button>
    </form>
</div>

<div class="grid grid-cols-3 gap-8">
    <div *ngFor="let site of allSites | async" class="shadow-lg border-2 border-gray-900">
        <img [src]="site.siteImgUrl" alt="">
        <h3 class="p-3 text-xl font-bold">{{site.siteName}}</h3>
        <div class="w-60 m-3 px-3 bg-blue-200 text-blue-800 rounded-lg text-sm">
            {{site.siteUrl}}
        </div>
        <button 
        routerLink="/password-list" 
        [queryParams]="{id: site.id, siteName:site.siteName, siteUrl:siteUrl, siteImgUrl:site.siteImgUrl}" 
        class="my-3 ml-3 mx-0.5 px-5 py-3 text-sm bg-gray-900 text-white shadow rounded-md">
            Add New Password
        </button>
        <button (click)="editSite(site.siteName,site.siteUrl,site.siteImgUrl, site.id)" class="my-3 mx-0.5 px-5 py-3 text-sm border-2 border-gray-900 text-gray-900 shadow rounded-md">
            Edit
        </button>
        <button (click)="deleteSite(site.id)" class="my-3 mx-0.5 px-5 py-3 text-sm border-2 border-gray-900 text-gray-900 shadow rounded-md">
            Delete
        </button>
        
    </div>
</div>

</div>
```

> You will get errors at this point because this functions and variables are not defined in .ts file. But as we go further we will add necessary code in our typescript file. So then you are not going to get any errors. So don’t worry about that just practice with the things then you will get idea.
> 

1. So now add code to our **site-list.component.ts** file.

```tsx
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
```

1. Now open **password-manager.service.ts** file.

```tsx
import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore,collection,addDoc,collectionData,doc,updateDoc,deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore:Firestore,private auth:Auth) { }

  addSite(data:object){
    const dbInstance = collection(this.firestore,'sites');
    return addDoc(dbInstance,data);
  }
  loadSites(){
    const dbInstance = collection(this.firestore,'sites');
    return collectionData(dbInstance,{idField:'id'})
  }
  updateSite(id:string, data:object){
    const docInstance = doc(this.firestore,'sites',id);
    return updateDoc(docInstance,data);
  }
  deleteSite(id:string){
    const docInstance = doc(this.firestore,'sites',id);
    return deleteDoc(docInstance);
  }

  //Password Queries
  addPassword(data:object,siteId:string){
    const dbInstance = collection(this.firestore,`sites/${siteId}/passwords`);
    return addDoc(dbInstance,data);
  }
  
  loadPasswords(siteId:string){
    const dbInstance = collection(this.firestore,`sites/${siteId}/passwords`);
    return collectionData(dbInstance,{idField:'id'});
  }

  updatePassword(siteId:string,passwordId:string,data:object){
    const docInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId);
    return updateDoc(docInstance,data);
  }

  deletePassword(siteId:string,passwordId:string){
    const docInstance = doc(this.firestore,`sites/${siteId}/passwords`,passwordId);
    return deleteDoc(docInstance)
  }

  //login
  login(email:string,password:string){
    return signInWithEmailAndPassword(this.auth,email,password);
  }
}

```

1. Now open the **password-list.component.html** file.

```html
<app-navbar></app-navbar>
<div class="container mx-auto my-16">

<!-- alert -->
<div *ngIf="isSuccess" class="p-5 my-3 bg-teal-100 text-teal-900">
    {{successMessage}}
 </div>

    <div class="grid grid-cols-2 gap-5">
        <div class="shadow-lg border-2 border-gray-900">
            <img [src]="siteImgUrl" alt="">
            <h3 class="text-xl font-bold p-3">{{siteNmae}}</h3>
            <div class="grid grid-cols-3 gap-3 my-1 p-3">
                <div class="col-span-2 px-3 bg-blue-200 text-blue-800 rounded-lg text-sm">
                    {{siteUrl}}
                </div>
            </div>
        </div>

        <div class="px-20 py-10 my-5 border-4 border-gray-900">
            <h2 class="text-3xl text-center">{{formState}} User & Password</h2>
            <p class="text-center">You can {{formState}} user & password from the below form</p>
            <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
                <div class="flex flex-col">
                    <label for="" class="text-lg font-medium mb-2">Email</label>
                    <input [(ngModel)]="email" type="email" name="email" class="border-2 border-gray-900 p-2 rounded-lg w-full">
                </div>
                <div class="flex flex-col">
                    <label for="" class="text-lg font-medium mb-2">Username</label>
                    <input [(ngModel)]="username" type="text" name="username" class="border-2 border-gray-900 p-2 rounded-lg w-full">
                </div>
                <div class="flex flex-col">
                    <label for="" class="text-lg font-medium mb-2">Password</label>
                    <input [(ngModel)]="password" type="password" name="password" class="border-2 border-gray-900 p-2 rounded-lg w-full">
                </div>
                <button class="mt-10 mx-0.5 px-5 py-3 text-sm bg-gray-900 text-white shadow rounded-md">
                    {{formState}} Password
                </button>
            </form>
        </div>

    </div>

    <div class="grid grid-cols-1 mt-10">
        <table class="border-2 border-gray-900">
            <thead>
                <tr class="bg-gray-200 p-52 h-14 text-left">
                    <th class="border-2 border-gray-900 p-3">Email</th>
                    <th class="border-2 border-gray-900 p-3">Username</th>
                    <th class="border-2 border-gray-900 p-3">Password</th>
                    <th class="border-2 border-gray-900 p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr class="h-14" *ngFor="let password of passwordList;let i = index">
                    <td class="border-2 border-gray-900 p-3">{{password.email}}</td>
                    <td class="border-2 border-gray-900 p-3">{{password.username}}</td>
                    <td class="border-2 border-gray-900 p-3">{{password.password}}
                        <button (click)="onDecrypt(password.password,i)" class="mx-0.5 px-5 py-1 text-sm bg-red-500 text-white shadow rounded-md">
                            Decrypt
                        </button>
                    </td>
                    <td class="border-2 border-gray-900 p-3">
                        <button (click)="editPassword(password.email,password.username,password.password,password.id)" class="mx-0.5 px-5 py-3 text-sm bg-gray-900 text-white shadow rounded-md">
                            Edit
                        </button>
                        <button
                        (click)="deletePassword(password.id)"
                         class="mx-0.5 px-5 py-3 text-sm border-2 border-gray-900 text-gray-900 shadow rounded-md">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
```

1. Now open the **password-list.component.ts** file.

```tsx
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

```

1. Now open the **app.routes.ts** file.

```tsx
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SiteListComponent } from './site-list/site-list.component';
import { PasswordListComponent } from './password-list/password-list.component';

export const routes: Routes = [
    {path: '',component:LoginComponent},
    {path:'site-list',component:SiteListComponent},
    {path:'password-list',component:PasswordListComponent}
];
```

> We have to store passwords for particular site so for that we have few approaches in firebase. in sql that is simple like we have passwords table and it contains foreign key of site table. below i am mentioning in sql way.
> 

Ex - SiteMaster

| SiteNo | SiteName |
| --- | --- |
| 1 | GoDaddy.com |
| 2 | DigitalOcean |

Ex - PasswordMaster

| PasswordNo | Password | SiteNo |
| --- | --- | --- |
| 1 | ABC | 1 |
| 2 | DEF | 1 |
| 3 | UVW | 2 |
| 4 | XYZ | 2 |

Firebase approaches:

**Approach 1:** Create array field inside sites document and in that create map data type so you can store key value pairs. but it is not good approach. ❌ because storing data like this is not good practice. as well as when you have to get particular data at that time while writing queries you will get difficulties.

![Untitled](Angular%20Password-Manager%20dae847a304bd49e3b043becb9db1323e/Untitled.png)

![Untitled](Angular%20Password-Manager%20dae847a304bd49e3b043becb9db1323e/Untitled%201.png)

**Approach 2:** This approach is more likely SQL approach in this we can create another separate collection for password and we will add the site document id inside the password document to create the relationship between the site collection and password collection. This approach is ok but little bit difficult to write queries for retrieving and inserting data.❌

![Untitled](Angular%20Password-Manager%20dae847a304bd49e3b043becb9db1323e/Untitled%202.png)

**Approach 3:** Firebase provides facility of sub collection i.e. collection inside document. so we can create passwords collection inside the site document. ✅ Using this approach we can write Angular fire queries easily. This approach is highly recommended while working with firestore. 

![Untitled](Angular%20Password-Manager%20dae847a304bd49e3b043becb9db1323e/Untitled%203.png)

[Untitled](Angular%20Password-Manager%20dae847a304bd49e3b043becb9db1323e/Untitled.mp4)

1. If you have notice we are storing password in encrypted form so for that we have to install package for that and the package name is **crypto-js**.

```
>npm i crypto-js
```

1. Now in order to encrypt the password using crypto-js. we required unique secrete key. so go to google and search “encryption key generator”. Take the Encryption key 256 bit.
2. Now open the **login.component.html** file and add this code.

```html
<section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <div class="w-full border-4 border-gray-900 bg-white rounded-lg shadow mx-w-md">
            <div class="p-6 space-y-6">
                <h1 class="text-2xl font-bold text-gray-900"> Login to your account </h1>

                <div *ngIf="isError" class="p-5 my-3 bg-red-100 text-red-900">
                    The username or Password is Wrong
                </div>

                <form #f="ngForm" class="space-y-6" (ngSubmit)="onSubmit(f.value)">
                    <div>
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900">
                            Your Email
                        </label>
                        <input ngModel type="email" name="email" placeholder="name@company.com" class="block w-full p-2.5 text-sm bg-gray-50 border-4 border-gray-900 text-gray-900 rounded-lg">
                        <label for="" class="block mb-2 text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <input ngModel type="password" name="password" placeholder="********" class="block w-full p-2.5 text-sm bg-gray-50 border-4 border-gray-900 text-gray-900 rounded-lg">
                    </div>
                    <button class="w-full text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>
```

1. Now open the **login.component.ts** file and add this code.

```tsx
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isError:boolean = false;

  constructor(private passwordManagerService:PasswordManagerService,private router:Router){}

  onSubmit(values:any){
    this.passwordManagerService.login(values.email,values.password).then(()=>{
      this.router.navigate(['/site-list']);
    }).catch((err)=>{
      this.isError = true;
    })
  }
}
```

> We are using firebase Authentication so we have to enable it. Firebase has several methods for authentication we are going to use **Email/Password.** After enabling create new user by providing email and password.
>