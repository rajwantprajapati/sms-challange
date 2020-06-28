import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { SmsService } from '../sms.service';
import { SmsData } from '../sms.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sms-list',
  templateUrl: './sms-list.component.html',
  styleUrls: ['./sms-list.component.scss']
})
export class SmsListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['id', 'city', 'start_date', 'end_date', 'price', 'status', 'color', 'action'];
    dataList: SmsData[] = [];
    dataSource: MatTableDataSource<SmsData>;
    startDate: any;
    endDate: any;
    isLoading: boolean = false;
    dataSubscription: Subscription;
    sort: any;
    paginator: any;

    @ViewChild(MatPaginator, {static: false}) set content1(content: ElementRef) {
        this.paginator = content;
        if (this.paginator){
           this.dataSource.paginator = this.paginator;
        } 
    };
   
    @ViewChild(MatSort, {static: false}) set content(content: ElementRef) {
        this.sort = content;
        if (this.sort){
           this.dataSource.sort = this.sort;
        }
    };

    constructor(private smsService: SmsService) {}

    ngOnInit() {
        this.isLoading = true;
        // observable subscription to get data from the service
        this.smsService.getDataList();
        this.dataSubscription = this.smsService.dataListUpdateListner().subscribe((data: SmsData[]) => {
            this.isLoading = false;
            this.dataList = data;

            this.provideDataToTable();
        });        
    }

    filterData() {
        // filter data based on selected start date and end date
        this.dataList = this.dataList.filter((data: SmsData) => 
            moment(data.start_date).isSameOrAfter(this.startDate) && moment(data.end_date).isSameOrBefore(this.endDate));

        this.provideDataToTable();
    }

    // method to privide data to table
    provideDataToTable() {
        this.dataSource = new MatTableDataSource(this.dataList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onDelete(id: number) {
        this.smsService.deleteData(id);
    }

    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }
}
