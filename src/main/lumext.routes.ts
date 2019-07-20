import { Route } from '@angular/router';
import { UserComponent } from './business/user/user.component';
import { LumextComponent } from './lumext.component';
import { EPGComponent } from './business/epg/epg.component';

export const ROUTES: Route[] = [
    {
        path: '',
        component: LumextComponent,
        children: [
            { path: 'user', component: UserComponent },
            { path: 'epg', component: EPGComponent },
            { path: '**', redirectTo: 'nasServer' }
        ]
    }
];
