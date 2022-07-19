import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Contractor} from "../../model/contractor";
import {ContractorService} from "../../service/contractor/contractor.service";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {Agent} from "../../model/agent";
import {AgentService} from "../../service/agent/agent.service";

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  form: FormGroup;

  contractorId: number | undefined;
  contractor: Contractor = {} as Contractor;
  result: any;
  agents: Agent[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private contractorService: ContractorService,
    private agentService: AgentService
  ) {
    this.form = new FormGroup({

      "lbl": new FormControl("", Validators.required),
      "nameFull": new FormControl("", Validators.required),
      "inn": new FormControl(""),
      "kpp": new FormControl("")
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contractorId = params['contractorId'];
      if (this.contractorId)
        this.loadContractor(this.contractorId);
    });

    if (this.contractorId)
      this.agentService.find(this.contractorId).subscribe(response => {
        this.result = response;
        this.agents = this.result.content;
      });
  }

  loadContractor(contractorId: number) {
    this.contractorService.getContractor(contractorId)
      .subscribe(response => {
        this.contractor = response;

        this.form.controls['lbl'].setValue(this.contractor.lbl);
        this.form.controls['nameFull'].setValue(this.contractor.nameFull);
        this.form.controls['inn'].setValue(this.contractor.inn);
        this.form.controls['kpp'].setValue(this.contractor.inn);
      });
  }

  submit() {
    this.contractor.lbl = this.form.controls['lbl'].value;
    this.contractor.nameFull = this.form.controls['nameFull'].value;
    this.contractor.inn = this.form.controls['inn'].value;
    this.contractor.kpp = this.form.controls['kpp'].value;

    this.contractorService.save(this.contractor).subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
