import { Bridge } from './../../model/bridge';
import { LumextService } from './../../service/lumext.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'bridge-component',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.css'],
  host: { 'class': 'content-container' },
  providers: [LumextService]
})


export class BridgeComponent implements OnInit {
  orgName: String;
  bridges: Bridge[];
  selectedBridge: Bridge;
  bridgeDataGridLoading: boolean = false;
  bridgeaddmodal: boolean = false;
  bridgedetailsmodal: boolean = false;
  showBridgeAcknowledge: boolean = false;

  bridgeaddform = new FormGroup({
    //TenantName: new FormControl('', [Validators.required]),
    BDName: new FormControl('', [Validators.required]),
    Description: new FormControl(''),
    // Type: new FormControl('', [Validators.required]),
    VRF: new FormControl('', [Validators.required]),
    // L2UnknownUnicast: new FormControl('', [Validators.required]),
    // L3UnknownMultiCastFlooding: new FormControl('', [Validators.required]),
    // MutliDestinationFlooding: new FormControl('', [Validators.required]),
    // ARPFlooding: new FormControl(),
    // EndpointDataplaneLearning: new FormControl(''),
    // LimitIPLearningToSubnet: new FormControl(''),
    // UnicastRouting: new FormControl(''),
    // mac: new FormControl(''),
    // vmac: new FormControl(''),
    ip1: new FormControl(''),
    // ip1Virtual: new FormControl(''),
    // ip1Preferred: new FormControl(''),
    // ip2: new FormControl(''),
    // ip2Virtual: new FormControl(''),
    // ip2Preferred: new FormControl('')
  });

  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getBridges();
    this.getCurrentOrgName();
  }

  openBridgeModal() {
    this.bridgeaddmodal = true;
    this.bridgeaddform.reset();
  }

  getCurrentOrgName(): void {
    this.lumextService.getOrgPath().subscribe(orgName => {
      console.log("Get the organisation name of VCD:"+orgName);
      this.orgName = orgName;
      this.bridgeDataGridLoading = false;
    }, (err) => {
      console.log("Get Organisation name error"+err);
      this.bridgeDataGridLoading = false;
    });
  }

  getBridges(): void {
    this.bridgeDataGridLoading = true;
    this.lumextService.getBridges().subscribe(bridges => {
      this.bridges = bridges;
      this.bridgeDataGridLoading = false;
    }, (err) => {
      this.bridgeDataGridLoading = false;
    });
    this.selectedBridge = null;
  }

  // Tenant Creation form submit
  createBridgeSubmit() {
    if (this.bridgeaddform.valid) {
      this.bridgeDataGridLoading = true;
      this.bridgeaddmodal = false;
      var jsonData = this.bridgeaddform.value;
      jsonData["operation"] = "AddBridgeDomain";
      jsonData["TenantName"] = this.orgName; 
      this.lumextService.addBridge(JSON.stringify(this.bridgeaddform.value)).subscribe(res => {
        this.bridgeaddform.reset();
        this.bridgeDataGridLoading = false;
        //this.getBridges();
      }, (err) => {
        //this.getBridges();
        this.showBridgeAcknowledge = true;
        this.bridgeDataGridLoading = false;
      });
    }
  }

  createBridgeCancel(form: NgForm) {
    this.bridgeaddmodal = false;
    form.reset();
  }

  closeBridgeAckAlert() {
    this.showBridgeAcknowledge = false;
  }

  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}

