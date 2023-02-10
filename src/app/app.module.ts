import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHeaderComponent } from './users/layout/user-header/user-header.component';
import { UserFooterComponent } from './users/layout/user-footer/user-footer.component';
import { ValuationComponent } from './users/forms/valuation/valuation.component';
import { UserHomeComponent } from './users/modules/user-home/user-home.component';
import { AboutComponent } from './users/modules/about/about.component';
import { ContactComponent } from './users/modules/contact/contact.component';
import { ModulesModule } from './users/modules/modules.module';
import { PreloaderComponent } from './users/common/preloader/preloader.component';
import { FormsModule } from './users/forms/forms.module';

@NgModule({
  declarations: [
    AppComponent,
    UserHeaderComponent,
    UserFooterComponent,
    ValuationComponent,
    UserHomeComponent,
    AboutComponent,
    ContactComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModulesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
