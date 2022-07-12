import { Component, OnInit } from '@angular/core';
import {Contractor} from "../../model/contractor";
import {ContractorService} from "../../service/contractor.service";

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {

  result: any;
  contractors: Contractor[] | undefined;

  constructor(private contractorService: ContractorService) {
  }

  ngOnInit() {
    this.contractorService.findAll().subscribe(data => {
      this.result = data;
      this.contractors = this.result.content;
    });
  }
}
