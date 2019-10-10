import { Vrf } from './../../model/vrf';
import { LumextService } from './../../service/lumext.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'vrf-component',
  templateUrl: './vrf.component.html',
  styleUrls: ['./vrf.component.css'],
  host: { 'class': 'content-container' },
  providers: [LumextService]
})

export class VrfComponent implements OnInit {
  orgName: string;
  vrfs: Vrf[];
  selectedVrf: Vrf;
  vrfDataGridLoading: boolean = false;
  vrfAddModal: boolean = false;
  vrfDetailsModal: boolean = false;
  showVrfAcknowledge: boolean = false;

  vrfAddForm = new FormGroup({

    vrfName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    pControlEnforcementPref: new FormControl('Unenforced',Validators.required),
    pControlEnforcementDir: new FormControl('Egress',Validators.required),
    //tenantName : new FormControl('')
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getvrfs();
    this.getCurrentOrgName();
  }

  openVrfModal() {
    this.vrfAddModal = true;
    this.vrfAddForm.reset();
  }

  getCurrentOrgName(): void {
    this.lumextService.getOrgPath().subscribe(orgName => {
      console.log("Get the organisation name of VCD:"+orgName);
      this.orgName = orgName;
      this.vrfDataGridLoading = false;
    }, (err) => {
      console.log("Get Organisation name error"+err);
      this.vrfDataGridLoading = false;
    });
  }

  getVrfs(): void {
    this.vrfDataGridLoading = true;
    this.lumextService.getVrfs().subscribe(vrfs => {
      this.vrfs = vrfs;
      this.vrfDataGridLoading = false;
    }, (err) => {
      this.vrfDataGridLoading = false;
    });
    this.selectedVrf = null;
  }

  // Tenant Creation form submit
  createVrfSubmit() {
    if (this.vrfAddForm.valid) {
      this.vrfDataGridLoading = true;
      this.vrfAddModal = false;
      var jsonData = this.vrfAddForm.value;
      jsonData["operation"] = "AddVrf";
      jsonData["tenantName"] = this.orgName;
      this.lumextService.addVrf(JSON.stringify(this.vrfAddForm.value)).subscribe(res => {
        console.log("Tenant Creation response Text"+JSON.stringify(res));
        this.vrfAddForm.reset();
        this.vrfDataGridLoading = false;
        //this.getvrfs();
      }, (err) => {
        //this.getvrfs();
        this.showVrfAcknowledge = true;
        this.vrfDataGridLoading = false;
      });
    }
  }

  createvrfCancel(form: NgForm) {
    this.vrfAddModal = false;
    form.reset();
  }

  closevrfAckAlert() {
    this.showVrfAcknowledge = false;
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}
