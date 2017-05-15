import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs: [ 'video' ],
  outputs: [ 'updateVideoEvent', 'deleteVideoEvent' ]
})
export class VideoDetailComponent implements OnInit {
    video: any;

  private updateVideoEvent = new EventEmitter();
  private deleteVideoEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  
  updateVideo(){
    this.updateVideoEvent.emit(this.video);
  }
  
  deleteVideo(){
    this.deleteVideoEvent.emit(this.video);
  }

}
