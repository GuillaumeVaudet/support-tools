import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {UploadAndParseLogComponent} from "./upload-and-parse-log/upload-and-parse-log.component";
import {DataComponent} from "./data/data.component";

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'log', component: UploadAndParseLogComponent},
  { path: 'data', component: DataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
