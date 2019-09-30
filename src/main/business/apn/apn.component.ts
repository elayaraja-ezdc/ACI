import { ApplicationProfile } from './../../model/applicationprofile';
import { LumextService } from './../../service/lumext.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'apn-component',
  templateUrl: './apn.component.html',
  styleUrls: ['./apn.component.css'],
  host: { 'class': 'content-container' },
  providers: [LumextService]
})

export class ApplicationProfileComponent implements OnInit {
  orgName: string;
  applicationProfiles: ApplicationProfile[];
  selectedApplicationProfile: ApplicationProfile;
  applicationProfileDataGridLoading: boolean = false;
  applicationProfileAddModal: boolean = false;
  applicationProfileDetailsModal: boolean = false;
  showApplicationProfileAcknowledge: boolean = false;

  applicationProfileAddForm = new FormGroup({

    //tenantName: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z]*/),Validators.maxLength(25)]),
    ApplicationProfileName: new FormControl(''),
    Description: new FormControl('')
    
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getapplicationprofiles();
    this.getCurrentOrgName();
  }

  openApplicationProfileModal() {
    this.applicationProfileAddModal = true;
    this.applicationProfileAddForm.reset();
  }

  getCurrentOrgName(): void {
    this.lumextService.getOrgPath().subscribe(orgName => {
      console.log("Get the organisation name of VCD:"+orgName);
      this.orgName = orgName;
      this.applicationProfileDataGridLoading = false;
    }, (err) => {
      console.log("Get Organisation name error "+err);
      this.applicationProfileDataGridLoading = false;
    });
  }

  getApplicationProfiles(): void {
    this.applicationProfileDataGridLoading = true;
    this.lumextService.getApplicationProfiles().subscribe(applicationprofiles => {
      this.applicationProfiles = applicationprofiles;
      this.applicationProfileDataGridLoading = false;
    }, (err) => {
      this.applicationProfileDataGridLoading = false;
    });
    this.selectedApplicationProfile = null;
  }

  // Tenant Creation form submit
  createApplicationProfileSubmit() {
    if (this.applicationProfileAddForm.valid) {
      this.applicationProfileDataGridLoading = true;
      this.applicationProfileAddModal = false;
      var jsonData = this.applicationProfileAddForm.value;
      jsonData["operation"] = "Addapplicationprofile";
      jsonData["tenantName"] = this.orgName;
      this.lumextService.addApplicationProfile(JSON.stringify(this.applicationProfileAddForm.value)).subscribe(res => {
        console.log("Tenant Creation response Text"+JSON.stringify(res));
        this.applicationProfileAddForm.reset();
        this.applicationProfileDataGridLoading = false;
        //this.getapplicationprofiles();
      }, (err) => {
        //this.getapplicationprofiles();
        this.showApplicationProfileAcknowledge = true;
        this.applicationProfileDataGridLoading = false;
      });
    }
  }

  createApplicationProfileCancel(form: NgForm) {
    this.applicationProfileAddModal = false;
    form.reset();
  }

  closeApplicationProfileAckAlert() {
    this.showApplicationProfileAcknowledge = false;
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}
