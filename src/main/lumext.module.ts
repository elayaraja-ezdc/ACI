import { LumextComponent } from './lumext.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import {Inject, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {EXTENSION_ROUTE, ExtensionNavRegistration, ExtensionNavRegistrationAction} from '@vcd-ui/common';
import {UserComponent} from './business/user/user.component';
import {ROUTES} from './lumext.routes';


import {ClarityModule} from 'clarity-angular';
import { MenuComponent } from './business/menu.component/menu.component';
import { EPGComponent } from './business/epg/epg.component';
import { BridgeComponent } from './business/bridge/bridge.component';
import { ContractComponent } from './business/contract/contract.component';
import { FilterComponent } from './business/filter/filter.component';
import { ConBindingComponent } from './business/conbinding/conbinding.component';
//Added by Elaya for clr-radio 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VrfComponent } from './business/vrf/vrf.component';
import { ApplicationProfileComponent } from './business/apn/apn.component';



@NgModule({
    imports: [
        ClarityModule,
        CommonModule,
        RouterModule.forChild(ROUTES),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        UserComponent,
        MenuComponent,
        LumextComponent,
        EPGComponent,
        BridgeComponent,
        ContractComponent,
        FilterComponent,
        ConBindingComponent,
        VrfComponent,
        ApplicationProfileComponent
       
    ],
    bootstrap: [
        UserComponent,
        LumextComponent
    ],
    //Added by Elaya for clr-radio
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class LumextModule {
    constructor(private appStore: Store<any>, @Inject(EXTENSION_ROUTE) extensionRoute: string) {
        const registration: ExtensionNavRegistration = {
            icon: '',
            path: extensionRoute,
            nameCode: 'nav.lumext',
            descriptionCode: 'nav.lumext.description'
        };
        appStore.dispatch(new ExtensionNavRegistrationAction(registration));
    }
}
