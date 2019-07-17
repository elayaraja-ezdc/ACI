import { Component, Inject, OnInit } from "@angular/core";
import { VcdApiClient } from '@vcd/sdk';
import { EXTENSION_ASSET_URL } from '@vcd/sdk/common';
import { Query } from "@vcd/sdk/query";
import { Observable } from "rxjs";
import {Headers, Http, Response} from '@angular/http';
import { Simple } from "../simple";
import {NgForm} from '@angular/forms';

const API_URL = "https://vcdcell01.sg.local";

@Component({
    selector: "plugin-simple",
    templateUrl: "./simple.component.html",
    styleUrls: ['./simple.component.scss'],
    host: {'class': 'content-container'}
})
export class SimpleComponent implements OnInit {
    username: Observable<string>;
    tenant: Observable<string>;
    private headers:{};
    public API_URL: string;
    
    VcdApiClient: any;
    constructor(
        private http:Http, 
        @Inject(EXTENSION_ASSET_URL) public assetUrl: string, 
        private client: VcdApiClient
        ) {
            this.headers = {'headers' : {'Accept':'application/*+xml;version=29.0'}};
        }

    ngOnInit(): void {
        this.tenant = this.client.organization;
        this.username = this.client.username
        console.log("VCD client-->"+VcdApiClient);
        this.client.query(Query.Builder.ofType("organization").links(false)).subscribe(results => {
            console.log(results);
        })
    }

    createEPGSubmit(form: NgForm)  {
        
        return this.http
          .post(`${this.VcdApiClient}/api/org/${this.tenant}/ticketing`,
                `<?xml version="1.0" encoding="UTF-8"?><ticket><ticket_msg>${form.controls['epgname'].value}</ticket_msg></ticket>`,
                this.headers)
          .map(res => parseTickets(res.text())[0]);
      }
}


// function parseXml(xml:string) {
//     var dom = null;
//     // if (window.DOMParser) {
//     //    try {
//     //       dom = (new DOMParser()).parseFromString(xml, 'text/xml');
//     //    }
//     //    catch (e) { dom = null; }
//     // }
//     // else if (window.ActiveXObject) {
//     // //    try {
//     // //       dom = new ActiveXObject('Microsoft.XMLDOM');
//     // //       dom.async = false;
//     // //       if (!dom.loadXML(xml)) // parse error ..
 
//     // //          window.alert(dom.parseError.reason + dom.parseError.srcText);
//     // //    }
//     // //    catch (e) { dom = null; }
//     // }
//     // else
//        alert('cannot parse xml string!');
//     return dom;
//  }
function parseTickets(xml:string) {
    let result:Simple[] = [];
    if (xml) {
    //   let dom = parseXml(xml);
    //   let tickets = dom.getElementsByTagName('ticket');
    //   for (let i=0; i<tickets.length; i++) {
    //     let ticket = tickets[i];
    //     result.push(
    //       {
    //         ticket_id: getNodeValue(ticket, 'ticket_id'),
    //         ticket_msg: getNodeValue(ticket, 'ticket_msg'),
    //         status: getNodeValue(ticket, 'status')
    //       }
    //     )
    //   }
    }
    return result;
  }

  function getNodeValue(dom:any, tagname:string) {
    let ret = '';
    if (dom) {
      let elems = dom.getElementsByTagName(tagname);
      if (elems && elems[0] && elems[0].firstChild) {
        ret = elems[0].firstChild.nodeValue;
      }
    }
    return ret;
  }