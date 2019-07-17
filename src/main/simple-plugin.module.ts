import { CommonModule } from "@angular/common";
import { Inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Store } from "@ngrx/store";
import { VcdApiClient, VcdSdkModule } from "@vcd/sdk";
import { ExtensionNavRegistration, EXTENSION_ROUTE } from "@vcd/sdk/common";
import { PluginModule } from "@vcd/sdk/core";
import { TranslateService } from "@vcd/sdk/i18n";
import { ClarityModule } from "clarity-angular";
import { SimpleComponent } from "./simple/simple.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule} from '@angular/forms';
const ROUTES: Routes = [
    { path: "", component: SimpleComponent }
];

@NgModule({
    imports: [
        ClarityModule,
        CommonModule,
        VcdSdkModule,
        FormsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        SimpleComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [SimpleComponent],
    exports: [],
    providers: [VcdApiClient]
})
export class SimplePluginModule extends PluginModule {
    constructor(appStore: Store<any>, @Inject(EXTENSION_ROUTE) extensionRoute: string, translate: TranslateService) {
        super(appStore, translate);
        this.registerExtension(<ExtensionNavRegistration>{
            path: extensionRoute,
            icon: "page",
            nameCode: "nav.label",
            descriptionCode: "nav.description"
        });
    }
}
