import { Component, OnInit, OnChanges, EventEmitter, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges {
    private tasks:Array<{}> = [];
    private modeAdd:boolean = false;
    private totalTasks:number = 0;
    private taskID:number = 0;
    private taskName:string = '';

    @ViewChild('paginator') private paginator:MatPaginator;

    constructor(private _ts:TaskService) {
    }

    ngOnInit() {
        this._ts.list(1)
        .subscribe(this.onGetTasks.bind(this), this.onError.bind(this));
    }

    ngOnChanges(){
    }

    onGetTasks(data){ // Tasks callback
        if(data.status = 200){
            this.tasks = data.body.rows;
            this.totalTasks = data.body.count;
        }
    }

    onError(error){ // LOG ERROR
        console.error(error);
    }

    onPageChange(event){
        this._ts.list(event.pageIndex+1)
        .subscribe(this.onGetTasks.bind(this), this.onError.bind(this));
    }

    toggleNewTask(){
        this.modeAdd = !this.modeAdd;
        if(this.modeAdd != true) this.taskName = ''; // Clear task name
    }

    addTask(){
        this._ts.create(this.taskName)
        .subscribe(data => {
            let response:any = data;
            console.log(response);
            if(response == "Created"){
                this.onPageChange({ pageIndex: this.paginator.pageIndex });
                this.toggleNewTask();
                this.taskName = '';
            }
        }, err => {
            console.error(err);
        });
    }

}
