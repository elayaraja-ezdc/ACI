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
  bridges: Bridge[];
  selectedBridge: Bridge;
  bridgeDataGridLoading: boolean = false;
  bridgeaddmodal: boolean = false;
  bridgedetailsmodal: boolean = false;
  showBridgeAcknowledge: boolean = false;

  bridgeaddform = new FormGroup({
    TenantName: new FormControl('', [Validators.required]),
    BDName: new FormControl('', [Validators.required]),
    Description: new FormControl(''),
    Type: new FormControl('', [Validators.required]),
    VRF: new FormControl('', [Validators.required]),
    L2UnknownUnicast: new FormControl('', [Validators.required]),
    L3UnknownMultiCastFlooding: new FormControl('', [Validators.required]),
    MutliDestinationFlooding: new FormControl('', [Validators.required]),
    ARPFlooding: new FormControl(''),
    EndpointDataplaneLearning: new FormControl(''),
    LimitIPLearningToSubnet: new FormControl(''),
    UnicastRouting: new FormControl('')
  });

  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getBridges();
  }

  openBridgeModal() {
    this.bridgeaddmodal = true;
    this.bridgeaddform.reset();
  }

  getBridges(): void {
    this.bridgedatagridloading = true;
    this.lumextService.getBridges().subscribe(bridges => {
      this.bridges = bridges;
      this.bridgedatagridloading = false;
    }, (err) => {
      this.bridgedatagridloading = false;
    });
    this.selectedBridge = null;
  }

  // Tenant Creation form submit
  createBridgeSubmit() {
    if (this.bridgeaddform.valid) {
      this.bridgedatagridloading = true;
      this.bridgeaddmodal = false;
      var jsonData = this.bridgeaddform.value;
      jsonData["operation"] = "AddBridgeDomain"; 
      this.lumextService.addBridge(JSON.stringify(this.bridgeaddform.value)).subscribe(res => {
        this.bridgeaddform.reset();
        this.bridgedatagridloading = false;
        //this.getBridges();
      }, (err) => {
        //this.getBridges();
        this.showBridgeAcknowledge = true;
        this.bridgedatagridloading = false;
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

