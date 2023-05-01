import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UploadAndParseLogComponent } from './upload-and-parse-log/upload-and-parse-log.component';
import { DataComponent } from './data/data.component';
import { TableComponent } from './table/table.component';
import { FilterByLevelsPipe } from './pipe/filter-by-levels.pipe';
import { LinesViewComponent } from './lines-view/lines-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    UploadAndParseLogComponent,
    DataComponent,
    TableComponent,
    FilterByLevelsPipe,
    LinesViewComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatSidenavModule
  ],
  providers: [DataComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
