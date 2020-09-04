import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors, FormArray} from "@angular/forms"

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.sass']
})
export class ReactiveFormsComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['',[
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)]],
      password: [null, [
        Validators.required,
        this.passwordValidator]],
      emails: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.addEmail()
  }

  /* Name */
  get name() {
    return this.form.get('name')
  }
  get nameIsInvalid() {
    return this.name.dirty && this.name.invalid
  }


  /* Password */
  get password() {
    return this.form.get('password')
  }
  get passwordIsInvalid() {
    return this.password.invalid && this.password.dirty
  }

  /* Email */
  get emailsArray(): FormArray{
    return this.form.get('emails') as FormArray
  }

  emailIsInvalid(index: number) {
    return this.emailsArray.at(index).invalid && this.emailsArray.at(index).dirty
  }

  addEmail() {
    this.emailsArray.push(new FormControl(null,
      [Validators.required,
        Validators.email]
    ))
  }

  removeEmail(index) {
    const emails = this.emailsArray
    if (emails.length > 1) {
      emails.removeAt(index)
    } else {
      emails.reset()
    }
  }

  passwordValidator(control: FormControl, error: ValidationErrors) {
    const value = control.value
    /* check if include numbers */
    const hasNumber = /[0-9]/.test(value)
    /*check if include capital letters */
    const hasCapitalLetter = /[A-Z]/.test(value)
    /*check if include lowercase letters */
    const hasLowercaseLetter = /[a-z]/.test(value)
    /*check if include length > than 7 */
    const isLengthValid = value ? value.length > 7 : false

    if (!hasNumber) {
      return { invalidPassword: 'Password should have numbers' }
    }
    if (!hasCapitalLetter) {
      return { invalidPassword: 'Password should have capital letters [A-Z]' }
    }
    if (!hasLowercaseLetter) {
      return { invalidPassword: 'Password should have lowercase letters [a-z]' }
    }
    if (!isLengthValid) {
      return { invalidPassword: 'Password is too short' }
    }
    return null
  }

  onSubmit() {
    this.form.reset()
  }
}
