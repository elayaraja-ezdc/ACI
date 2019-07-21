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
  showUserAcknowledge: boolean = false;

  useraddform = new FormGroup({
    tenantName: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z]*/),Validators.maxLength(25)]),
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getUsers();
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
      var jsonData = this.useraddform.value;
      jsonData["operation"] = "AddTenant";
      this.lumextService.addUser(JSON.stringify(this.useraddform.value)).subscribe(res => {
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
