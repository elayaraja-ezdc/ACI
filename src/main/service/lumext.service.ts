import { User } from './../model/user';
import { Epg } from './../model/epg';
import { Bridge } from './../model/bridge';

import {Filter} from './../model/Filter';
import {ConBinding} from './../model/ConBinding';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Vrf } from '../model/vrf';
import { AuthTokenHolderService, API_ROOT_URL } from '@vcd-ui/common';
import { Contract } from '../model/contract';


@Injectable()
export class LumextService {

  private currentOrgId: string;
  private headers: {};

  constructor(
    private http: Http,
    authTokenHolderService: AuthTokenHolderService,
    @Inject(API_ROOT_URL) private apiRootUrl: string) {
    this.headers = { 'headers': { 'x-vcloud-authorization': authTokenHolderService.token, 'Accept': 'application/*+json;version=31.0' } }

    // this.apicHeaders = {
    //   "headers": {
    //     "Accept":"application/json",
    //     "rejectUnauthorized": false       
    //   }
    // }
  }

  getOrgPath() {
    
	  console.log("Current org id:"+JSON.stringify(this.currentOrgId));
    if (this.currentOrgId) {
      return Observable.of<string>(this.currentOrgId);
    }
    return this.http.get('/api/org', this.headers)
      .map((res: Response) => {
        const orgArray = JSON.parse(res.text()).org;
        console.log("Path ="+document.location.pathname.split(/\/tenant\//)[1].split('/')[0]);
        return document.location.pathname.split(/\/tenant\//)[1].split('/')[0];
      });
  }

  getOrgId() {
    
	  console.log("Current org id:"+JSON.stringify(this.currentOrgId));
    if (this.currentOrgId) {
      return Observable.of<string>(this.currentOrgId);
    }
    return this.http.get('/api/org', this.headers)
      .map((res: Response) => {
        const orgArray = JSON.parse(res.text()).org;
        console.log("Path ="+document.location.pathname.split(/\/tenant\//)[1].split('/')[0]);
        const orgName = document.location.pathname.split(/\/tenant\//)[1].split('/')[0];
        const orgId = orgArray.find((item: any) => item.name === orgName);
        this.currentOrgId = orgId.href.split(/\/org\//)[1];
        return orgId.href.split(/\/org\//)[1];
      });
  }

  // getUsers(): Observable<User[]> {
  //   return this.getOrgId()
  //     .mergeMap(orgId => {
  //       return this.http
  //         .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
  //         //.map((res: Response) => JSON.parse(res.text()))
  //         .map((res: Response) => JSON.parse(JSON.stringify(res)))
  //         .catch(this.handleError);
  //     });
  // }
  // getAllTenantData(vcdToken: string, vcdUrlToken: string): Observable<User[]> {
  //   var value = '{"aaaUser": {"attributes": {"name": "admin","pwd": "ciscopsdt"}}}';
  //   this.apicHeaders["headers"]["Cookie"] = "APIC-cookie=" + vcdToken;
  //   this.apicHeaders["headers"]["APIC-challenge"] = vcdUrlToken;
  //   return this.getOrgId()
  //     .mergeMap(orgId => {
  //       return this.http
  //       //devnetsbx-netacad-apicem-1.cisco.com
  //         //.get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
  //         .get(`https://APIC/api/class/fvTenant.json`,this.apicHeaders)
  //         //.map((res: Response) => JSON.parse(res.text()))
  //         .map((res: Response) => JSON.parse(JSON.stringify(res)))
  //         .catch(this.handleError);
  //     });
  // }

  getUsers(): Observable<User[]> {
    //var value = '{"aaaUser": {"attributes": {"name": "admin","pwd": "ciscopsdt"}}}';
    var value = '{"aaaUser": {"attributes": {"name": "admin","pwd": "P@ssw0rd"}}}';
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
        //devnetsbx-netacad-apicem-1.cisco.com
          //.get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .post(`https://APIC/api/aaaLogin.json?gui-token-request=yes`,value,this.apicHeaders)
          //.map((res: Response) => JSON.parse(res.text()))
          .map((res: Response) => JSON.parse(JSON.stringify(res)))
          .catch(this.handleError);
      });
  }
  addUser(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
   console.log("Org id:"+this.getOrgId());
   console.log("Current Org ID:"+this.currentOrgId);
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }

  getVrfs(): Observable<Vrf[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .map((res: Response) => JSON.parse(res.text()))
          .catch(this.handleError);
      });
  }
  addVrf(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
	 console.log("Org id:"+JSON.stringify(this.getOrgId));
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }

  getEpgs(): Observable<Epg[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .map((res: Response) => JSON.parse(res.text()))
          .catch(this.handleError);
      });
  }
  addEpg(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
	 console.log("Org id:"+JSON.stringify(this.getOrgId));
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }

  getApplicationProfiles(): Observable<Epg[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .map((res: Response) => JSON.parse(res.text()))
          .catch(this.handleError);
      });
  }
  addApplicationProfile(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
	 console.log("Org id:"+JSON.stringify(this.getOrgId));
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }


  getBridges(): Observable<Bridge[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .map((res: Response) => JSON.parse(res.text()))
          .catch(this.handleError);
      });
  }
  addBridge(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
	 console.log("Org id:"+JSON.stringify(this.getOrgId));
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }

  getContracts(): Observable<Contract[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .map((res: Response) => JSON.parse(res.text()))
          .catch(this.handleError);
      });
  }
  addContract(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
	 console.log("Org id:"+JSON.stringify(this.getOrgId));
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }
  getFilters(): Observable<Filter[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .map((res: Response) => JSON.parse(res.text()))
          .catch(this.handleError);
      });
  }
  addFilter(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
	 console.log("Org id:"+JSON.stringify(this.getOrgId));
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }
  getConBindings(): Observable<ConBinding[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .map((res: Response) => JSON.parse(res.text()))
          .catch(this.handleError);
      });
  }
  addConBinding(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
	 console.log("Org id:"+JSON.stringify(this.getOrgId));
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }
}
