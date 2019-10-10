import { ConBinding } from './../../model/conbinding';
import { LumextService } from './../../service/lumext.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'conbinding-component',
  templateUrl: './conbinding.component.html',
  styleUrls: ['./conbinding.component.css'],
  host: { 'class': 'content-container' },
  providers: [LumextService]
})

export class ConBindingComponent implements OnInit {
  orgName: string;
  conBindings: conBindings[];
  selectedConBinding: ConBinding;
  conBindingdatagridloading: boolean = false;
  conBindingaddmodal: boolean = false;
  conBindingdetailsmodal: boolean = false;
  showConBindingAcknowledge: boolean = false;

  conBindingaddform = new FormGroup({
    applicationProfileName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    epgName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    providedContract: new FormControl(''),
    consumedContract: new FormControl('')
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getConBindings();
    this.getCurrentOrgName();
  }

  getCurrentOrgName(): void {
    this.lumextService.getOrgPath().subscribe(orgName => {
      console.log("Get the organisation of VCD"+orgName);
      this.orgName = orgName;
      this.conBindingdatagridloading = false;
    }, (err) => {
      console.log("Get Organisation Name error"+err);
      this.conBindingdatagridloading = false;
    });
  }

  openConBindingModal() {
    this.conBindingaddmodal = true;
    this.conBindingaddform.reset();
  }

  getConBindings(): void {
    this.conBindingdatagridloading = true;
    this.lumextService.getConBindings().subscribe(conBindings => {
      this.conBindings = conBindings;
      this.conBindingdatagridloading = false;
    }, (err) => {
      this.conBindingdatagridloading = false;
    });
    this.selectedConBinding = null;
  }

  // Tenant Creation form submit
  createConBindingSubmit() {
    if (this.conBindingaddform.valid) {
      this.conBindingdatagridloading = true;
      this.conBindingaddmodal = false;
      var jsonData = this.conBindingaddform.value;
      jsonData["operation"] = "AddContractBinding";
      console.log("Contract binding ORG Name:"+this.orgName);
      jsonData["tenantName"] = this.orgName;
      this.lumextService.addConBinding(JSON.stringify(this.conBindingaddform.value)).subscribe(res => {
        console.log("ConBinding Creation response Text"+JSON.stringify(res));
        this.conBindingaddform.reset();
        this.conBindingdatagridloading = false;
        //this.getConBindings();
      }, (err) => {
        //this.getConBindings();
        this.showConBindingAcknowledge = true;
        this.conBindingdatagridloading = false;
      });
    }
  }

  createConBindingCancel(form: NgForm) {
    this.conBindingaddmodal = false;
    form.reset();
  }

  closeConBindingAckAlert() {
    this.showConBindingAcknowledge = false;
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}
