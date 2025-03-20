import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import{ FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly authService=inject(AuthService)
  private readonly formBuilder=inject(FormBuilder)
  private readonly router=inject(Router)
  private readonly toastrService=inject(ToastrService)



  isLoading:boolean=false;

  successMsg:string=''
  errorMsg:string=''

  

  registerFrom:FormGroup =this.formBuilder.group(
    {
      name:[null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
      email:[null , [Validators.required , Validators.email]],
      password:[null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,20}$/)]],
      age:[null , [Validators.required , Validators.min(18) , Validators.pattern(/^[1(8-9)-9][0-9]$/)]],
      phone:[null , [Validators.required , Validators.pattern(/^[0-5]{3}[0-9]{8}$/) , Validators.maxLength(11)]],
    }
  )



  submitForm():void{
    

    if(this.registerFrom.valid){
      this.isLoading=true;
      this.authService.sendRegisterForm(this.registerFrom.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.msg === "done"){

            this.toastrService.success(res.msg , "Register")

            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 500);
            

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

  sendRegisterData():void{
    
  }

}
