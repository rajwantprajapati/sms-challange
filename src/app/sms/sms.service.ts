import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SmsData } from './sms.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const URL: string = environment.apiUrl + '/sms/';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private dataList: SmsData[] = [];
  private dataUpdated = new Subject<SmsData[]>();

  constructor(private http: HttpClient, private router: Router) {}

  // get the data from the server
  getDataList() {
    return this.http.get<{message: string, data: SmsData[]}>(URL).subscribe((response) => {
      this.dataList = response.data;
      this.dataUpdated.next([...this.dataList]);
    });
  }

  getData(id: number) {
    return this.http.get(URL + id);
  }

  addData(smsData: SmsData) {
    this.dataList.sort((a: SmsData, b: SmsData) => b.id - a.id);
    smsData.id = this.dataList[0].id + 1;

    this.http.post<{message: string, data: SmsData}>(URL, smsData).subscribe((response) => {
      this.dataList.push(smsData);
      this.dataUpdated.next([...this.dataList]);
      this.router.navigate(['/']);
    });
  }

  updateData(smsData: SmsData) {
    this.http
      .patch(URL + smsData.id, smsData)
      .subscribe(response => {
        const updatedData = [...this.dataList];
        const oldDataIndex = updatedData.findIndex(data => data.id === smsData.id);
        updatedData[oldDataIndex] = smsData;
        this.dataList = updatedData;

        this.dataUpdated.next([...this.dataList]);
        this.router.navigate(["/"]);
      });
  }

  deleteData(id: number) {
    this.http.delete(URL+ id).subscribe((response) => {
      this.dataList = this.dataList.filter((data: SmsData) => data.id !== id );
      this.dataUpdated.next([...this.dataList]);
    });
  }

  dataListUpdateListner() {
    return this.dataUpdated.asObservable();
  }
}
