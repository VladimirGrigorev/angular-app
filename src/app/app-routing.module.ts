import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./component/main/main.component";
import { ContractorListComponent } from "./component/contractor-list/contractor-list.component";


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'contractors', component: ContractorListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
