import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.sass']
})
export class TemplateDrivenComponent implements OnInit {
  @ViewChild('Form')Form:NgForm
  constructor() { }

  ngOnInit(): void {
  }

  /*Сlear form on submit*/
  onSubmit(){
    this.Form.reset()
  }
}
