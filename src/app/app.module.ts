import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ContractorListComponent } from './component/contractor-list/contractor-list.component';
import { MainComponent } from './component/main/main.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContractorComponent } from './component/contractor/contractor.component';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    ContractorListComponent,
    MainComponent,
    ContractorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
