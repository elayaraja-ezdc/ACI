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


  //Updated by elaya 
  epgaddform = new FormGroup({
    tenantName: new FormControl('', [Validators.required]),
    multiApicDn: new FormControl('', [Validators.required]),
    numberOfAppTier: new FormControl('',[Validators.required,Validators.pattern(/^[0-9\._-]{1,3}$/)]),
    // name: new FormControl('', Validators.required),
    // dns: new FormControl('', [Validators.required]),
    // status: new FormControl('', [Validators.required]),
    enableEPG: new FormControl('')
  });


  epgdetailsform = new FormGroup({
    login: new FormControl(this.selectedEpg ? this.selectedEpg.login : '', [Validators.required, Validators.pattern(/^[A-Za-z0-9\._-]{7,256}$/)]),
    display_name: new FormControl(this.selectedEpg ? this.selectedEpg.display_name : '', [Validators.required, Validators.maxLength(64), Validators.pattern(/^[\w+|\s]{5,64}$/)]),
    description: new FormControl(this.selectedEpg ? this.selectedEpg.description : '', Validators.maxLength(1024)),
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
      jsonData["operation"] = "AddTenant";
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

