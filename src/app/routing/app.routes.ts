import { Routes } from "@angular/router";
import { FormComponent } from '../component/form/form.component';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../component/login/login.component';
import { DisplayRecordsComponent } from '../component/display-records/display-records.component';
import { ContactusComponent } from '../component/contactus/contactus.component';

export const appRoutes:Routes=[
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path:'login',component: LoginComponent},
    {path:"home",component:AppComponent},
    {path:"form",component:AppComponent,children:[{
        path:'',component:FormComponent
    }]},
    
    {path:"feedback",component:AppComponent,children:[{
        path:'',component:FormComponent
    }]},
     {path:"contactus",component:AppComponent,children:[{
        path:'',component:ContactusComponent
    }]},
    {path:"list",component:AppComponent,children:[{
        path:'',component:DisplayRecordsComponent
    }]},
    
    {path:"list/brandtype/&productType",component:AppComponent,children:[{
        path:'',component:DisplayRecordsComponent
    }]}
]