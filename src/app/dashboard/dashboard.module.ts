import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MaterialModule } from '../material/material.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderListComponent } from './pages/order-list/order-list.component';

@NgModule({
  declarations: [DashboardLayoutComponent, OrderPageComponent, OrderListComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, SharedModule],
})
export class DashboardModule {}
