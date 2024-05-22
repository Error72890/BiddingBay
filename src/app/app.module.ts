import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuctionListComponent } from './components/auction-list/auction-list.component';
import { AuctionDetailComponent } from './components/auction-detail/auction-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HistoryComponent } from './components/history/history.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuctionCreatorComponent } from './components/auction-creator/auction-creator.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuctionCardComponent } from './components/partials/auction-card/auction-card.component';
import { AlertCardComponent } from './components/partials/alert-card/alert-card.component';
import { SessionGuard } from './guards/session.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AuthenticationComponent,
    AuctionListComponent,
    AuctionDetailComponent,
    UserProfileComponent,
    HistoryComponent,
    SettingsComponent,
    AuctionCreatorComponent,
    CategoriesComponent,
    AuctionCardComponent,
    AlertCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    HttpClientModule,
  ],
  providers: [SessionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
