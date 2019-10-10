import { Filter } from './../../model/filter';
import { LumextService } from './../../service/lumext.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'filter-component',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  host: { 'class': 'content-container' },
  providers: [LumextService]
})

export class FilterComponent implements OnInit {
  orgName: string;
  filters: Filter[];
  selectedFilter: Filter;
  filterDataGridLoading: boolean = false;
  filterAddModal: boolean = false;
  filterDetailsModal: boolean = false;
  showFilterAcknowledge: boolean = false;

  filterAddForm = new FormGroup({
    //tenantName : new FormControl(' ',[Validators.required]),
    filterName : new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    dFromPort: new FormControl('', [Validators.required,Validators.pattern(/^[0-9_.-]*$/),Validators.maxLength(6)]),
    dToPort: new FormControl('', [Validators.required,Validators.pattern(/^[0-9_.-]*$/),Validators.maxLength(6)]),
    etherT: new FormControl('', [Validators.required]),
    prot: new FormControl('', [Validators.required]),
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getFilters();
    this.getCurrentOrgName();
  }

  openFilterModal() {
    this.filterAddModal = true;
    this.filterAddForm.reset();
  }

  getCurrentOrgName(): void {
    this.lumextService.getOrgPath().subscribe(orgName => {
      console.log("Get the organisation name of VCD"+orgName);
      this.orgName = orgName;
      this.filterDataGridLoading = false;
    }, (err) => {
      console.log("Get Organisation name error "+err);
      this.filterDataGridLoading = false;
    });
  }

  getFilters(): void {
    this.filterDataGridLoading = true;
    this.lumextService.getFilters().subscribe(filters => {
      this.filters = filters;
      this.filterDataGridLoading = false;
    }, (err) => {
      this.filterDataGridLoading = false;
    });
    this.selectedFilter = null;
  }

  // Tenant Creation form submit
  createFilterSubmit() {
    if (this.filterAddForm.valid) {
      this.filterDataGridLoading = true;
      this.filterAddModal = false;
      var jsonData = this.filterAddForm.value;
      jsonData["operation"] = "AddFilter";
      // console.log("ORG ID:"+this.lumextService.getOrgId());
      jsonData["tenantName"] = this.orgName;
      this.lumextService.addFilter(JSON.stringify(this.filterAddForm.value)).subscribe(res => {
        console.log("Filter Creation response Text"+JSON.stringify(res));
        this.filterAddForm.reset();
        this.filterDataGridLoading = false;
        //this.getFilters();
      }, (err) => {
        //this.getFilters();
        this.showFilterAcknowledge = true;
        this.filterDataGridLoading = false;
      });
    }
  }

  createFilterCancel(form: NgForm) {
    this.filterAddModal = false;
    form.reset();
  }

  closeFilterAckAlert() {
    this.showFilterAcknowledge = false;
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}
