import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from '@angular/forms'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        })
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        let key = 'FormOBJ';
        let myObj = { name: this.registerForm.value.firstName,
         lastName:  this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password:this.registerForm.value.password};
        localStorage.setItem(key, JSON.stringify(myObj));
        let item = JSON.parse(localStorage.getItem(key));
        console.log(item);
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

}
