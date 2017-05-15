import { VideoService } from './../video.service';
import { Video } from './../video'; 
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

    videos: Array<Video>;
    
SelectedVideo: Video;
private hidenewVideo: boolean = true;

  constructor(private _videoService: VideoService) { }

  ngOnInit() {
  this._videoService.getVideos()
  .subscribe(resVideoData => this.videos= resVideoData);
  }
  
  onSelectVideo(video: any){
    this.SelectedVideo = video;
    this.hidenewVideo = true;
    console.log(this.SelectedVideo);
  }
  
  onSubmitAddVideo(video: Video){
    this._videoService.addVideo(video)
    .subscribe(resNewVideo => {
    this.videos.push(resNewVideo);
    this.hidenewVideo = true;
    this.SelectedVideo = resNewVideo;
    });
  }
  
  onupdateVideoEvent(video: any){
    this._videoService.updateVideo(video)
    .subscribe(resupdateVideo => video = resupdateVideo);
    this.SelectedVideo = null;
  }
  
  ondeleteVideoEvent(video: any){
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
    .subscribe(resdeleteVideo => {
        for(let i=0; i< videoArray.length; i++)
        {
        if(videoArray[i]._id === video._id)
        {
            videoArray.splice(i, 1);
        }
        }
    });
    this.SelectedVideo = null;
    
  };
  
  newVideo(){
    this.hidenewVideo = false;
  }

}
