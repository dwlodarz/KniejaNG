import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BannerComponent } from './banner/banner.component';
import { CtaComponent } from './cta/cta.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
{
    path: '',
    component: MainComponent,
  //  data: { title: 'Heroes List' }
  },
   { path: 'main', component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    BannerComponent,
    CtaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})


export class AppModule { }
