import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
