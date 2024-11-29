import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_B2IoBETqQ',
            redirectUrl: window.location.origin,
            clientId: '386tpl138o1vibtrlbs5ajrn0j',
            scope: 'phone openid email',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
    }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
