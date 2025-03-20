import { HttpInterceptorFn } from '@angular/common/http';


export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem('userToken')!==null) {
    req = req.clone({
      setHeaders:{
        token:`3b8ny__${localStorage.getItem('userToken')}`!
      }
    })
    
  }

  return next(req);
};
