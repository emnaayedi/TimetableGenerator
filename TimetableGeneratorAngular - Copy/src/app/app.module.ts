import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {MemberListComponent} from './main/member/member-list/member-list.component';
import {MemberFormComponent} from './main/member/member-form/member-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from "../@root/shared.module";
import {LayoutComponent} from './layout/layout.component';
import {FirebaseModule} from "../@root/firebase/firebase.module";
import {LoginComponent} from './auth/login/login.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from 'src/services/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    MemberListComponent,
    MemberFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FirebaseModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
