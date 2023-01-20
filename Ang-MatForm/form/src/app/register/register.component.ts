import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder, AbstractControl} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void { //sf tetiklendiğinde
    this.registerForm = this.formBuilder.group({
      firstName:["",[Validators.required]],
      lastName:["",[Validators.required]],
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required,Validators.minLength(8)]],
      rePassword:["",[Validators.required,Validators.minLength(8)]],
      address:["",[Validators.required]]
    },{
      validators:this.sifreEslestirme('password','rePassword')
    })
  }

  sifreEslestirme(Password:string, ConfirmPassword:string)
  {
    return (controls:AbstractControl) => { //abstract kontrolden türüyor ve controls değişkeni verdik.
      if(controls)
      {
        const Password = controls.get('password')!.value;
        const ConfirmPassword = controls.get('rePassword')!.value; //inputların değerlerini bu değişkenlerde tutuyoruz
        if(Password !== ConfirmPassword)
        {
          controls.get('rePassword')?.setErrors({ esitdegil: true}); //eşit değil erroru html kısmında var mı yok gibi uygulayabiliriz.
          return {eslesmeVarmi:true} //Eğer eşleşmiyorsa hata ortaya çıkarması. return ediyoruz.
        }
      }
      return null;
    }
  }
}
