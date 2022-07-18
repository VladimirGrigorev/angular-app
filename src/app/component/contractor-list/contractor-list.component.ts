import { Component, OnInit } from '@angular/core';
import {Contractor} from "../../model/contractor";
import {ContractorService} from "../../service/contractor.service";
import {FormControl} from "@angular/forms";
import {Filter} from "../../model/filter";

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent implements OnInit {

  result: any;
  contractors: Contractor[] | undefined;
  queryField: FormControl = new FormControl();
  searchColumn: string = '';

  column: string = '';
  operator: string = '';
  expression: string = '';
  showExpression: boolean = false;

  filter: Filter = new Filter();

  constructor(private contractorService: ContractorService) {
  }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe(queryField => {
        if (this.searchColumn == "") {
          this.contractorService.searchAll(queryField)
            .subscribe(response => {
              this.result = response;
              this.contractors = this.result.content;
            })
        } else {
          this.contractorService.filterOneCond(this.searchColumn, "like", "%" + queryField + "%")
            .subscribe(response => {
              this.result = response;
              this.contractors = this.result.content;
            })
        }
      });

    this.contractorService.find().subscribe(response => {
      this.result = response;
      this.contractors = this.result.content;
    });
  }

  searchColumnChange(event: Event): void {
    if(this.queryField.value && this.queryField.value != '') {
      if (this.searchColumn != '')
        this.contractorService.filterOneCond(this.searchColumn, "like", "%" + this.queryField.value + "%")
          .subscribe(response => {
            this.result = response;
            this.contractors = this.result.content;
          })
      else
        this.contractorService.searchAll(this.queryField.value)
          .subscribe(response => {
            this.result = response;
            this.contractors = this.result.content;
          })
    }
  }

  valueChange(event: Event): void {
    this.showExpression = !(this.operator == "blank" || this.operator == "not blank");
  }

  onSubmit(column: string, operator: string, expression: string) {
    this.filter.logic = "and";

    if (operator == "contains") {
      this.filter.cond.push({
        "field": column,
        "operator": "like",
        "value": "%" + expression + "%"
      });
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    } else if (operator == "not contains") {
      this.filter.cond.push({
        "field": column,
        "operator": "not_like",
        "value": "%" + expression + "%"
      });
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    } else if (operator == "equals") {
      this.filter.cond.push({
        "field": column,
        "operator": "eq",
        "value": expression
      });
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    } else if (operator == "not equal") {
      this.filter.cond.push({
        "field": column,
        "operator": "not_eq",
        "value": expression
      });
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    } else if (operator == "starts with") {
      this.filter.cond.push({
        "field": column,
        "operator": "like",
        "value": expression + "%"
      });
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    } else if (operator == "ends with") {
      this.filter.cond.push({
        "field": column,
        "operator": "like",
        "value": "%" + expression
      });
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    } else if (operator == "blank") {
      this.filter.cond.push({
        "field": column,
        "operator": "null",
        "value": ""
      });
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    } else if (operator == "not blank") {
      this.filter.cond.push({
        "field": column,
        "operator": "not_null",
        "value": ""
      });
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
  }

  clearFilter() {
    this.filter = new Filter();
    this.contractorService.find().subscribe(response => {
      this.result = response;
      this.contractors = this.result.content;
    });
  }

  deleteFilter(i: number) {
    this.filter.cond.splice(i, 1);
    if (this.filter.cond.length == 0)
      this.contractorService.find().subscribe(response => {
        this.result = response;
        this.contractors = this.result.content;
      });
    else
      this.contractorService.filter(this.filter)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
  }
}
