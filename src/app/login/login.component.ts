import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { AuthGuard } from '../auth.guard';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token:any;
  constructor(private http: HttpClient, private auth: AuthGuard, private router: Router ) { }
  ngOnInit() {
  }
  //login function
  signIn(form:NgForm){
    this.http.post('http://test-demo.aem-enersol.com/api/account/login',{
      username:form.value.uname,
      password: form.value.upass
    }).toPromise().then((fetchedToken)=>{
      if(fetchedToken != undefined){
        this.auth.checkToken(fetchedToken);
        this.router.navigateByUrl('/dashboard');
      }
    })
    .catch((err) =>{
      alert(err.statusText);
    })
  }

}
