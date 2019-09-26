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
  filters: Filter[];
  selectedFilter: Filter;
  filterdatagridloading: boolean = false;
  filteraddmodal: boolean = false;
  filterdetailsmodal: boolean = false;
  showFilterAcknowledge: boolean = false;

  filteraddform = new FormGroup({
    filterName : new FormControl(' '),
    dFromPort: new FormControl(''),
    dToPort: new FormControl(''),
    etherT: new FormControl(''),
    prot: new FormControl('')
  });

  
  constructor(private lumextService: LumextService) { }

  ngOnInit(): void {
    //this.getFilters();
  }

  openFilterModal() {
    this.filteraddmodal = true;
    this.filteraddform.reset();
  }

  getFilters(): void {
    this.filterdatagridloading = true;
    this.lumextService.getFilters().subscribe(filters => {
      this.filters = filters;
      this.filterdatagridloading = false;
    }, (err) => {
      this.filterdatagridloading = false;
    });
    this.selectedFilter = null;
  }

  // Tenant Creation form submit
  createFilterSubmit() {
    if (this.filteraddform.valid) {
      this.filterdatagridloading = true;
      this.filteraddmodal = false;
      var jsonData = this.filteraddform.value;
      jsonData["operation"] = "AddFilter";
      console.log("ORG ID:"+this.lumextService.getOrgId());
      jsonData["tenantName"] = this.lumextService.getOrgId();
      this.lumextService.addFilter(JSON.stringify(this.filteraddform.value)).subscribe(res => {
        console.log("Filter Creation response Text"+JSON.stringify(res));
        this.filteraddform.reset();
        this.filterdatagridloading = false;
        //this.getFilters();
      }, (err) => {
        //this.getFilters();
        this.showFilterAcknowledge = true;
        this.filterdatagridloading = false;
      });
    }
  }

  createFilterCancel(form: NgForm) {
    this.filteraddmodal = false;
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
