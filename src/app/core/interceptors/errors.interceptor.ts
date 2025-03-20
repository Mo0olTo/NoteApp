import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toastrService=inject(ToastrService)
  
  return next(req).pipe(
    catchError((err)=>{
      console.log("errors from int" , err);
      
      toastrService.error(err.error.msg , )

      return throwError(()=>err)
      
    })
  );
};
