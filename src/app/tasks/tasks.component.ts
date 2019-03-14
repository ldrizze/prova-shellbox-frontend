import { Component, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges {
    private tasks:Array<{}> = [];
    private modeAdd:boolean = true;

    constructor(private _ts:TaskService) {
    }

    ngOnInit() {
        this._ts.list(1)
        .subscribe(this.onGetTasks.bind(this), this.onError.bind(this));
    }

    ngOnChanges(){
    }

    onGetTasks(data){
        if(data.status = 200) this.tasks = data.body;
    }

    onError(error){

    }

    onPageChange(event){
        this._ts.list(event.pageIndex+1)
        .subscribe(this.onGetTasks.bind(this), this.onError.bind(this));
    }

    toggleNewTask(){
        this.modeAdd = !this.modeAdd;
    }

}
