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
  users: User[];
  selectedUser: User;
  userdatagridloading: boolean = false;
  useraddmodal: boolean = false;
  userdetailsmodal: boolean = false;


  //Updated by elaya 
  useraddform = new FormGroup({
    tenantName: new FormControl('', [Validators.required]),
    multiApicDn: new FormControl('', [Validators.required]),
    name: new FormControl('', Validators.required),
    dns: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    enableEPG: new FormControl('')
  });

  userdetailsform = new FormGroup({
    login: new FormControl(this.selectedUser ? this.selectedUser.login : '', [Validators.required, Validators.pattern(/^[A-Za-z0-9\._-]{7,256}$/)]),
    display_name: new FormControl(this.selectedUser ? this.selectedUser.display_name : '', [Validators.required, Validators.maxLength(64), Validators.pattern(/^[\w+|\s]{5,64}$/)]),
    description: new FormControl(this.selectedUser ? this.selectedUser.description : '', Validators.maxLength(1024)),
  });
  
  regexPassword: RegExp = /[\w+|\W]{8,127}/;
  passwordGenerated: string;
  visiblePassword = false;

  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  openUserModal() {
    this.useraddmodal = true;
    this.useraddform.reset();
  }

  getUsers(): void {
    this.userdatagridloading = true;
    this.lumextService.getUsers().subscribe(users => {
      this.users = users;
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
      this.lumextService.addUser(JSON.stringify(this.useraddform.value)).subscribe(res => {
        this.useraddform.reset();
        this.userdatagridloading = false;
        //this.getUsers();
      }, (err) => {
        //this.getUsers();
        this.userdatagridloading = false;
      });
    }
  }

  createUserCancel(form: NgForm) {
    this.useraddmodal = false;
    form.reset();
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}
