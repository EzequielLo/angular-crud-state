import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppCrudPostComponent } from './post/app-crud-post/app-crud-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MarterialModule } from './shared/marterial.module';
@NgModule({
  declarations: [
    AppComponent,
    AppCrudPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
