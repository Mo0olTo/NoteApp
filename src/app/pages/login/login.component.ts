import { Component, inject } from '@angular/core';
import{ FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService=inject(AuthService)
    private readonly formBuilder=inject(FormBuilder)
    private readonly router=inject(Router)
    private readonly toastrService=inject(ToastrService)
  
  
  
    isLoading:boolean=false;
    successMsg:string=''
     errorMsg:string=''


  
    loginFrom:FormGroup =this.formBuilder.group(
      {
        email:[null , [Validators.required , Validators.email]],
        password:[null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,20}$/)]], 
      }
    )



    submitForm():void{
      

      if(this.loginFrom.valid){
        this.isLoading=true
        this.authService.sendLoginForm(this.loginFrom.value).subscribe({
          next:(res)=>{
            console.log(res);

            if(res.msg==='done'){
              localStorage.setItem('userToken' , res.token)

              this.toastrService.success(  res.msg ,"Login")

              setTimeout(() => {
                this.router.navigate(['/home'])
              }, 600);

              this.successMsg=res.msg
            }
             this.isLoading=false
          
          },error:(err)=>{
            console.log(err);
            this.isLoading=false

            this.errorMsg=err.error.msg
            
          }
        })
      }
     
      
    }

}
