import { Epg } from './../../model/epg';
import { LumextService } from './../../service/lumext.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'epg-component',
  templateUrl: './epg.component.html',
  styleUrls: ['./epg.component.css'],
  host: { 'class': 'content-container' },
  providers: [LumextService]
})


@Component({
  selector: 'epg-component',
  templateUrl: './epg.component.html',
  styleUrls: ['./epg.component.css'],
  host: { 'class': 'content-container' },
})



export class EPGComponent implements OnInit {
  epgs: Epg[];
  selectedEpg: Epg;
  epgdatagridloading: boolean = false;
  epgaddmodal: boolean = false;
  epgdetailsmodal: boolean = false;
  //Default Drop Down value
  existingBD: string = 'common';
  intraEPG: string = 'Enforced';
  grpMember: string = 'Exclude';


  epgaddform = new FormGroup({
    addNewTenant: new FormControl(''),
    tenantName: new FormControl('', [Validators.required]),
    addNewBridgeDomain: new FormControl(''),
    existingBD: new FormControl(''),
    applicationProfileName: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    epgName: new FormControl('',[Validators.required]),
    vmmDomainProfile: new FormControl('',[Validators.required]),
    resoultionImmediacy: new FormControl('',[Validators.required]),
    vlaMode: new FormControl('',[Validators.required]),
    //Dropdown Value
    intraEPG: new FormControl(''),
    grpMember: new FormControl('')
  });

  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getEpgs();
  }

  openEpgModal() {
    this.epgaddmodal = true;
    this.epgaddform.reset();
  }

  getEpgs(): void {
    this.epgdatagridloading = true;
    this.lumextService.getEpgs().subscribe(epgs => {
      this.epgs = epgs;
      this.epgdatagridloading = false;
    }, (err) => {
      this.epgdatagridloading = false;
    });
    this.selectedEpg = null;
  }

  // Tenant Creation form submit
  createEpgSubmit() {
    if (this.epgaddform.valid) {
      this.epgdatagridloading = true;
      this.epgaddmodal = false;
      var jsonData = this.epgaddform.value;
      jsonData["operation"] = "AddEPG";
      jsonData["existingBD"] = this.existingBD;
      jsonData["intraEPG"] = this.intraEPG;
      jsonData["grpMember"] = this.grpMember; 
      this.lumextService.addEpg(JSON.stringify(this.epgaddform.value)).subscribe(res => {
        this.epgaddform.reset();
        this.epgdatagridloading = false;
        //this.getEpgs();
      }, (err) => {
        //this.getEpgs();
        this.epgdatagridloading = false;
      });
    }
  }

  createEpgCancel(form: NgForm) {
    this.epgaddmodal = false;
    form.reset();
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}

