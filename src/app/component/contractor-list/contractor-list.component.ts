import { Component, OnInit } from '@angular/core';
import {Contractor} from "../../model/contractor";
import {ContractorService} from "../../service/contractor/contractor.service";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
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

  isJPA: boolean = true;

  filter: Filter = new Filter();

  form: FormGroup;
  checkArray: FormArray;

  constructor(
    private contractorService: ContractorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });
    this.checkArray = this.form.get('checkArray') as FormArray;
  }

  ngOnInit() {
    this.initCheckArray()

    this.queryField.valueChanges
      .subscribe(queryField => {
        if (this.searchColumn == "") {
          this.contractorService.searchAll(queryField, this.isJPA)
            .subscribe(response => {
              this.result = response;
              this.contractors = this.result.content;
            })
        } else {
          this.contractorService.filterOneCond(this.searchColumn,
            "like",
            "%" + queryField + "%",
            this.isJPA)
            .subscribe(response => {
              this.result = response;
              this.contractors = this.result.content;
            })
        }
      });

    this.contractorService.find(this.isJPA).subscribe(response => {
      this.result = response;
      this.contractors = this.result.content;
    });
  }

  searchColumnChange(event: Event): void {
    if(this.queryField.value && this.queryField.value != '') {
      if (this.searchColumn != '')
        this.contractorService.filterOneCond(this.searchColumn,
          "like",
          "%" + this.queryField.value + "%",
          this.isJPA)
          .subscribe(response => {
            this.result = response;
            this.contractors = this.result.content;
          })
      else
        this.contractorService.searchAll(this.queryField.value, this.isJPA)
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
      this.contractorService.filter(this.filter, this.isJPA)
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
      this.contractorService.filter(this.filter, this.isJPA)
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
      this.contractorService.filter(this.filter, this.isJPA)
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
      this.contractorService.filter(this.filter, this.isJPA)
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
      this.contractorService.filter(this.filter, this.isJPA)
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
      this.contractorService.filter(this.filter, this.isJPA)
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
      this.contractorService.filter(this.filter, this.isJPA)
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
      this.contractorService.filter(this.filter, this.isJPA)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
    }
  }

  clearFilter() {
    this.filter = new Filter();
    this.contractorService.find(this.isJPA).subscribe(response => {
      this.result = response;
      this.contractors = this.result.content;
    });
  }

  deleteFilter(i: number) {
    this.filter.cond.splice(i, 1);
    if (this.filter.cond.length == 0)
      this.contractorService.find(this.isJPA).subscribe(response => {
        this.result = response;
        this.contractors = this.result.content;
      });
    else
      this.contractorService.filter(this.filter, this.isJPA)
        .subscribe(response => {
          this.result = response;
          this.contractors = this.result.content;
        });
  }

  radioChange(event: Event): void {
    this.contractorService.find(this.isJPA).subscribe(response => {
      this.result = response;
      this.contractors = this.result.content;
    });
  }

  onCheckboxChange(e: Event) {
    this.checkArray = this.form.get('checkArray') as FormArray;
    const ischecked = (<HTMLInputElement>e.target).checked;
    const value = (<HTMLInputElement>e.target).value;

    if (ischecked) {
      this.checkArray.push(new FormControl(value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: AbstractControl) => {
        if (item.value == value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }

  initCheckArray(){
    this.checkArray = this.form.get('checkArray') as FormArray;
    this.checkArray.push(new FormControl("lbl"));
    this.checkArray.push(new FormControl("nameFull"));
    this.checkArray.push(new FormControl("address"));
    this.checkArray.push(new FormControl("inn"));
    this.checkArray.push(new FormControl("kpp"));
    this.checkArray.push(new FormControl("listWork"));
  }
}
