import { MainComponent } from './layouts/main/main.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { mainGuard } from './core/guards/main/main.guard';

export const routes: Routes = [

    {path:'' , redirectTo:'home' ,pathMatch:'full'},

    {path:'' , component:AuthComponent , canActivate:[mainGuard],
         children:[
                {path:'register' , component:RegisterComponent , title:'Register'},
                {path:'login' , component:LoginComponent , title:'Login'},
             ]} ,

    {path:'' ,component:MainComponent ,canActivate:[authGuard], children:[
        {path:'home' , loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent) , title:'Home'},
        {path:'about' , loadComponent:()=>import('./pages/about/about.component').then((c)=>c.AboutComponent) , title:'About'},
        {path:'notes' , loadComponent:()=>import('./pages/notes/notes.component').then((c)=>c.NotesComponent) , title:'Notes'},
        {path:'contact' , loadComponent:()=>import('./pages/contact/contact.component').then((c)=>c.ContactComponent) , title:'Contact'},
        {path:'**' , loadComponent:()=>import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent) , title:'NotFound'} ,
    ]} ,
    
    
];
