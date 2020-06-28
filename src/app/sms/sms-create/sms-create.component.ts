import { SmsData } from './../sms.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import * as moment from 'moment';
import { SmsService } from '../sms.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sms-create',
  templateUrl: './sms-create.component.html',
  styleUrls: ['./sms-create.component.scss']
})
export class SmsCreateComponent implements OnInit {
  smsData: SmsData = {
    id: 0,
    city: '',
    start_date: moment().format('MM/DD/YYYY'),
    end_date:  moment().format('MM/DD/YYYY'),
    price: 0,
    status: '',
    color: '#00ff00'
  };
  isLoading: boolean = false;
  private mode: string = 'create';
  private id: string;

  constructor(private smsService: SmsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.mode = "edit";
        this.id = paramMap.get("id");
        this.isLoading = true;
        // get data of selected id
        this.smsService.getData(+this.id).subscribe(response => {
          this.isLoading = false;
          let data: any = response;

          // populate data in edit form
          this.smsData = { 
            id: data.id,
            city: data.city,
            start_date: data.start_date,
            end_date: data.end_date,
            price: data.price,
            status: data.status,
            color: data.color
          }
        });
      } else {
        this.mode = "create";
        this.id = null;
      }
    });
  }

  onSaveData(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;

    this.smsData.start_date = moment(this.smsData.start_date).format('MM/DD/YYYY');
    this.smsData.end_date = moment(this.smsData.end_date).format('MM/DD/YYYY');

    if (this.mode === "create") {
      this.smsService.addData({...this.smsData});
    } else {
      this.smsService.updateData({...this.smsData});
    }
   
    form.resetForm();
  }

}
