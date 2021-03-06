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


export class EPGComponent implements OnInit {
  orgName: string;
  epgs: Epg[];
  selectedEpg: Epg;
  epgDataGridLoading: boolean = false;
  epgAddModal: boolean = false;
  epgDetailsModal: boolean = false;
  showEpgAcknowledge: boolean = false;
  //Default Drop Down value
  intraEPG: string = 'Enforced';
  grpMember: string = 'Exclude';


  epgAddForm = new FormGroup({
    addNewTenant: new FormControl(''),
    //tenantName: new FormControl('', [Validators.required]),
    //addNewBridgeDomain: new FormControl(''),
    existingBD: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    applicationProfileName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    description: new FormControl(''),
    epgName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    vmmDomainProfile: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    resoultionImmediacy: new FormControl(''),
    vlanMode: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    //Dropdown Value
    intraEPG: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    grpMember: new FormControl('')
  });

  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getEpgs();
    this.getCurrentOrgName();
  }

  openEpgModal() {
    this.epgAddModal = true;
    this.epgAddForm.reset();
  }

  getCurrentOrgName(): void {
    this.lumextService.getOrgPath().subscribe(orgName => {
      console.log("Get the organisationname of VCD:"+orgName);
      this.orgName = orgName;
      this.epgDataGridLoading = false;
    }, (err) => {
      console.log("Get Organisation name error"+err);
      this.epgDataGridLoading = false;
    });
  }

  getEpgs(): void {
    this.epgDataGridLoading = true;
    this.lumextService.getEpgs().subscribe(epgs => {
      this.epgs = epgs;
      this.epgDataGridLoading = false;
    }, (err) => {
      this.epgDataGridLoading = false;
    });
    this.selectedEpg = null;
  }

  // Tenant Creation form submit
  createEpgSubmit() {
    if (this.epgAddForm.valid) {
      this.epgDataGridLoading = true;
      this.epgAddModal = false;
      var jsonData = this.epgAddForm.value;
      jsonData["operation"] = "AddEPG";
      jsonData["intraEPG"] = this.intraEPG;
      jsonData["grpMember"] = this.grpMember;
      jsonData["tenantName"] = this.orgName; 
      this.lumextService.addEpg(JSON.stringify(this.epgAddForm.value)).subscribe(res => {
        this.epgAddForm.reset();
        this.epgDataGridLoading = false;
        //this.getEpgs();
      }, (err) => {
        //this.getEpgs();
        this.showEpgAcknowledge = true;
        this.epgDataGridLoading = false;
      });
    }
  }

  createEpgCancel(form: NgForm) {
    this.epgAddModal = false;
    form.reset();
  }

  closeEpgAckAlert() {
    this.showEpgAcknowledge = false;
  }

  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}

