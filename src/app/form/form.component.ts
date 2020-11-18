import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {IGetTranslateRequest, TranslateService} from "src/services/translate.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  disableRu = false;
  disableEn = false;
  translateTarget = '';

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {

  }

  onChangeInputRU(form: NgForm) {
    if (!this.disableRu && this.disableEn && form.controls['ru'].value === '') {
      form.controls['en'].setValue('')
    }
    if (!this.disableRu) this.translateTarget = 'en';
    if (form.controls['ru'].value !== '' && this.translateTarget !== 'ru') {
      this.disableEn = true
    } else this.disableEn = false
  }

  onChangeInputEN(form: NgForm) {
    if (!this.disableEn && this.disableRu && form.controls['en'].value === '') {
      form.controls['ru'].setValue('')
    }
    if (!this.disableEn) this.translateTarget = 'ru';
    if (form.controls['en'].value !== '' && this.translateTarget !=='en') {
      this.disableRu = true
    } else this.disableRu = false


  }

  onSubmit(form: NgForm){
    const params: IGetTranslateRequest = {
      client: 'gtx',
      sl: (this.translateTarget === 'en') ? 'ru': 'en',
      tl: this.translateTarget,
      dt: 't',
      q: (this.translateTarget === 'en') ? form.controls['ru'].value : form.controls['en'].value
    }
    if ((form.controls['ru'].value !== '') || (form.controls['en'].value !== ''))
      {
        this.translateService.getTranslate(params).subscribe(res => {
          (this.translateTarget === 'en') ?
            form.controls['en'].setValue(res[0][0][0])
            : form.controls['ru'].setValue(res[0][0][0]);
        })
      }
  }

}
