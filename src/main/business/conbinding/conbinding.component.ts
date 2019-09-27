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
  conBindings: conBinding[];
  selectedConBinding: ConBinding;
  conBindingdatagridloading: boolean = false;
  conBindingaddmodal: boolean = false;
  conBindingdetailsmodal: boolean = false;
  showConBindingAcknowledge: boolean = false;

  conBindingaddform = new FormGroup({
    applicationProfileName: new FormControl(''),
    epgName: new FormControl(''),
    providedContract: new FormControl(''),
    consumedContract: new FormControl('')
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getConBindings();
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
      // console.log("ORG ID:"+this.lumextService.getOrgId());
      // jsonData["tenantName"] = this.lumextService.getOrgId();
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
