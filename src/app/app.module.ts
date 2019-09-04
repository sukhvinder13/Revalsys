import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './component/form/form.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routing/app.routes';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DisplayRecordsComponent } from './component/display-records/display-records.component'
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    DashboardComponent,
    DisplayRecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule ,
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
