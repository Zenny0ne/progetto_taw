import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './screens/homepage/homepage.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { CartComponent } from './screens/cart/cart.component';
import { DetailprodComponent } from './screens/detailprod/detailprod.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './authguard.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { EditProfileComponent } from './screens/edit-profile/edit-profile.component';
import { NotificationsComponent } from './custom/notifications/notifications.component';

export const routes: Routes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'detailprod', component: DetailprodComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'profile/editProfile', component: EditProfileComponent },
    { path: 'profile/notifications', component: NotificationsComponent },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
];

