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
  contractdatagridloading: boolean = false;
  contractaddmodal: boolean = false;
  contractdetailsmodal: boolean = false;
  showContractAcknowledge: boolean = false;

  contractaddform = new FormGroup({
    contractType: new FormControl(''),
    contractSubject: new FormControl(''),
    contractFilter: new FormControl('')
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getContracts();
  }

  openContractModal() {
    this.contractaddmodal = true;
    this.contractaddform.reset();
  }

  getContracts(): void {
    this.contractdatagridloading = true;
    this.lumextService.getContracts().subscribe(contracts => {
      this.contracts = contracts;
      this.contractdatagridloading = false;
    }, (err) => {
      this.contractdatagridloading = false;
    });
    this.selectedContract = null;
  }

  // Tenant Creation form submit
  createContractSubmit() {
    if (this.contractaddform.valid) {
      this.contractdatagridloading = true;
      this.contractaddmodal = false;
      var jsonData = this.contractaddform.value;
      jsonData["operation"] = "AddContract";
      this.lumextService.addContract(JSON.stringify(this.contractaddform.value)).subscribe(res => {
        console.log("Contract Creation response Text"+JSON.stringify(res));
        this.contractaddform.reset();
        this.contractdatagridloading = false;
        //this.getContracts();
      }, (err) => {
        //this.getContracts();
        this.showContractAcknowledge = true;
        this.contractdatagridloading = false;
      });
    }
  }

  createContractCancel(form: NgForm) {
    this.contractaddmodal = false;
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
