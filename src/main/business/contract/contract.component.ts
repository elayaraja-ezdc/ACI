import { Contract } from './../../model/contract';
import { LumextService } from './../../service/lumext.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'contract-component',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
  host: { 'class': 'content-container' },
  providers: [LumextService]
})

export class ContractComponent implements OnInit {
  contracts: Contract[];
  selectedContract: Contract;
  contractDataGridLoading: boolean = false;
  contractAddModal: boolean = false;
  contractDetailsModal: boolean = false;
  showContractAcknowledge: boolean = false;

  contractAddForm = new FormGroup({
    contractType: new FormControl(''),
    contractSubject: new FormControl('',[Validators.required]),
    contractFilter: new FormControl(''),
    contractName: new FormControl('',[Validators.required])
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getContracts();
  }

  openContractModal() {
    this.contractAddModal = true;
    this.contractAddForm.reset();
  }

  getContracts(): void {
    this.contractDataGridLoading = true;
    this.lumextService.getContracts().subscribe(contracts => {
      this.contracts = contracts;
      this.contractDataGridLoading = false;
    }, (err) => {
      this.contractDataGridLoading = false;
    });
    this.selectedContract = null;
  }

  // Tenant Creation form submit
  createContractSubmit() {
    if (this.contractAddForm.valid) {
      this.contractDataGridLoading = true;
      this.contractAddModal = false;
      var jsonData = this.contractAddForm.value;
      jsonData["operation"] = "AddContract";
      this.lumextService.addContract(JSON.stringify(this.contractAddForm.value)).subscribe(res => {
        console.log("Contract Creation response Text"+JSON.stringify(res));
        this.contractAddForm.reset();
        this.contractDataGridLoading = false;
        //this.getContracts();
      }, (err) => {
        //this.getContracts();
        this.showContractAcknowledge = true;
        this.contractDataGridLoading = false;
      });
    }
  }

  createContractCancel(form: NgForm) {
    this.contractAddModal = false;
    form.reset();
  }

  closeContractAckAlert() {
    this.showContractAcknowledge = false;
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}
