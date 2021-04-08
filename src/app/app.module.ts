import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ContactComponent } from './contact/contact.component';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';
import { CvComponent } from './cv/cv.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { environment } from 'src/environments/environment';
import { BackgroundMovementDirective } from './background-movement.directive';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ContactComponent,
    CvComponent,
    BackgroundMovementDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ClickOutsideModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptchaKey } as RecaptchaSettings,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
