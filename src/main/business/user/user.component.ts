import { User } from './../../model/user';
import { LumextService } from './../../service/lumext.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  host: { 'class': 'content-container' },
  providers: [LumextService]
})

export class UserComponent implements OnInit {
  orgName: string;
  users: User[];
  tokens: [];
  vcdToken: String;
  vcdUrlToken: String;
  tenantsData: [];
  selectedUser: User;
  userdatagridloading: boolean = false;
  useraddmodal: boolean = false;
  userdetailsmodal: boolean = false;
  showUserAcknowledge: boolean = false;

  useraddform = new FormGroup({
    tenantName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)])
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getUsers();
    this.getCurrentOrgName();
  }

  openUserModal() {
    this.useraddmodal = true;
    this.useraddform.reset();
  }

  getCurrentOrgName(): void {
    this.userdatagridloading = true;
    this.lumextService.getOrgPath().subscribe(orgName => {
      console.log("Get the organisation name of VCD:"+orgName);
      this.orgName = orgName;
      this.userdatagridloading = false;
    }, (err) => {
      console.log("Get organisation error "+err);
      this.userdatagridloading = false;
    });
  }

  // getTenantData(vcdToken, vcdUrlToken): void {

  //   console.log("tenant method1:"+vcdToken);
  //   console.log("tenant method2:"+vcdUrlToken);
  //   this.lumextService.getAllTenantData(vcdToken, vcdUrlToken).subscribe(tenantsData => {
  //     this.tenantsData = tenantsData['_body'];
  //     console.log("Get ACI Tenant:"+JSON.stringify(tenantsData));
  //     this.userdatagridloading = false;
  //   }, (err) => {
  //     this.userdatagridloading = false;
  //   });

  // }

  getUsers(): void {
    this.userdatagridloading = true;
    this.lumextService.getUsers().subscribe(tokens => {
      this.tokens = tokens['_body'];
      console.log("Get ACI Token:"+JSON.stringify(tokens));
      console.log("Token"+JSON.stringify(JSON.parse(tokens['_body'])['imdata'][0]['aaaLogin']['attributes']['token']));
      console.log("urlToken"+JSON.stringify(JSON.parse(tokens['_body'])['imdata'][0]['aaaLogin']['attributes']['urlToken']));
      this.vcdToken = JSON.parse(tokens['_body'])['imdata'][0]['aaaLogin']['attributes']['token'];
      this.vcdUrlToken = JSON.parse(tokens['_body'])['imdata'][0]['aaaLogin']['attributes']['urlToken']
      //console.log(" URL Token"+JSON.parse(tokens['_body']).imdata[0].attributes.urlToken);
      //this.getTenantData(this.vcdToken, this.vcdUrlToken);
      this.userdatagridloading = false;
    }, (err) => {
      this.userdatagridloading = false;
    });
    this.selectedUser = null;
  }

  // Tenant Creation form submit
  createUserSubmit() {
    if (this.useraddform.valid) {
      this.userdatagridloading = true;
      this.useraddmodal = false;
      var jsonData = this.useraddform.value;
      console.log("Current Org Name:-->"+this.OrgName);
      jsonData["operation"] = "AddTenant";
      this.lumextService.addUser(JSON.stringify(this.useraddform.value)).subscribe(res => {
        console.log("Tenant Creation response Text"+JSON.stringify(res));
        this.useraddform.reset();
        this.userdatagridloading = false;
        //this.getUsers();
      }, (err) => {
        //this.getUsers();
        this.showUserAcknowledge = true;
        this.userdatagridloading = false;
      });
    }
  }

  createUserCancel(form: NgForm) {
    this.useraddmodal = false;
    form.reset();
  }

  closeUserAckAlert() {
    this.showUserAcknowledge = false;
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}
