import { User } from './../model/user';
import { Epg } from './../model/epg';
import { Bridge } from './../model/bridge';

import {Filter} from '../../model/Filter';
import {ConBinding} from '../../model/ConBinding';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

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
        return orgId.href.split(/\/org\//)[1];
        //return "Org1";
      });
    //return "221f3a61-2f43-4194-ae18-cf8160317cb2";
  }

  getUsers(): Observable<User[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/user`, this.headers)
          .map((res: Response) => JSON.parse(res.text()))
          .catch(this.handleError);
      });
  }
  addUser(value: string) {
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
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/epg`, this.headers)
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
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/epg`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }

  getBridges(): Observable<Bridge[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/epg`, this.headers)
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
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/bridge`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }

  getContracts(): Observable<Contract[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/contract`, this.headers)
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
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/contract`, value, this.headers)
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
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/filter`, this.headers)
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
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/filter`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }
  getConBindings(): Observable<ConBinding[]> {
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
          .get(`${this.apiRootUrl}/api/org/${orgId}/lumext/conbinding`, this.headers)
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
         .post(`${this.apiRootUrl}/api/org/${orgId}/lumext/conbinding`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }
}
