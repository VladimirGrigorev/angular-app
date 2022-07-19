import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./component/main/main.component";
import { ContractorListComponent } from "./component/contractor-list/contractor-list.component";
import { ContractorComponent } from "./component/contractor/contractor.component";


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'contractors', component: ContractorListComponent },
  { path: 'contractor/:contractorId', component: ContractorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
