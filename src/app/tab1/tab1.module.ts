import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NavViewComponent } from '../nav-view/nav-view.component';
import { SettingsBarComponent } from '../settings-bar/settings-bar.component';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
  ],
  declarations: [
    Tab1Page,
    NavBarComponent,
    NavViewComponent,
    SettingsBarComponent,
  ],
})
export class Tab1PageModule {}
