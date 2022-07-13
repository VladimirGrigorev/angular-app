import { Component, OnInit } from '@angular/core';
import {Contractor} from "../../model/contractor";
import {ContractorService} from "../../service/contractor.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {

  result: any;
  contractors: Contractor[] | undefined;
  queryField: FormControl = new FormControl();

  column: string = '';
  operator: string = '';
  expression: string = '';
  showExpression: boolean = false;


  constructor(private contractorService: ContractorService) {
  }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe(queryField => this.contractorService.search(queryField)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        }));

    this.contractorService.find().subscribe(response => {
      this.result = response;
      this.contractors = this.result.content;
    });
  }

  valueChange(event:Event):void {
    this.showExpression = !(this.operator == "blank" || this.operator == "not blank");
  }

  onSubmit(column: string, operator: string, expression: string) {
    if(operator == "contains") {
      this.contractorService.filter(column, "like", "%" + expression + "%")
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
    else if (operator == "equals"){
      this.contractorService.filter(column, "eq", expression)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
    else if (operator == "not equal"){
      this.contractorService.filter(column, "not_eq", expression)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
    else if (operator == "starts with"){
      this.contractorService.filter(column, "like", expression + "%")
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
    else if (operator == "ends with"){
      this.contractorService.filter(column, "like", "%" + expression)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
    else if (operator == "blank"){
      this.contractorService.filter(column, "null", "")
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
    else if (operator == "not blank"){
      this.contractorService.filter(column, "not_null", "")
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
  }
}
