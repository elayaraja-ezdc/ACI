import { User } from './../model/user';
import { Epg } from './../model/epg';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { AuthTokenHolderService, API_ROOT_URL } from '@vcd-ui/common';

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
        const orgName = document.location.pathname.split(/\/tenant\//)[1].split('/')[0];
        const orgId = orgArray.find((item: any) => item.name === orgName);
        return orgId.href.split(/\/org\//)[1];
      });
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

  getEpgs(): Observable<User[]> {
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

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(error);
  }
}
