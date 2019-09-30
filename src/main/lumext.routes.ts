import { Route } from '@angular/router';
import { UserComponent } from './business/user/user.component';
import { EPGComponent } from './business/epg/epg.component';
import { BridgeComponent } from './business/bridge/bridge.component';
import { LumextComponent } from './lumext.component';
import { ContractComponent } from './business/contract/contract.component';
import { FilterComponent } from './business/filter/filter.component';

import { ConBindingComponent } from './business/conbinding/conbinding.component';
import { VrfComponent } from './business/vrf/vrf.component';
import { ApplicationProfileComponent } from './business/apn/apn.component';


export const ROUTES: Route[] = [
    {
        path: '',
        component: LumextComponent,
        children: [
            { path: 'user', component: UserComponent },
            { path: 'epg', component: EPGComponent },
            { path: 'bridge', component: BridgeComponent },
            { path: 'contract', component: ContractComponent },        
            { path: 'filter', component: FilterComponent },
            { path: 'conbinding', component: ConBindingComponent },
            { path: 'vrf', component: VrfComponent },
            { path: 'applicationprofilename', component: ApplicationProfileComponent },
            { path: '**', redirectTo: 'nasServer' }
        ]
    }
];
