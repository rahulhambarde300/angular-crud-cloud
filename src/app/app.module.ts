import { FlightModule } from './flight/flight.module';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { APP_EXTRA_OPTIONS, APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HotelModule } from './hotel/hotel.module';
import { AuthConfigModule } from './auth/auth-config.module';
import {AuthModule} from 'angular-auth-oidc-client';
import { LogoutComponent } from './auth/logout/logout.component';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FlightModule,
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),
    HotelModule,
    AuthModule.forRoot({
      config: {
        authority: environment.AUTHORITY,
        redirectUrl: `${window.location.origin}/` ,
        clientId: environment.CLIENT_ID,
        scope: 'phone openid email',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
      },
    }),
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    LogoutComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AuthModule],
})
export class AppModule {
}
