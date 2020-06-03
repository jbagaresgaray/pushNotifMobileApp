import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.css'],
})
export class DetailsPage implements OnInit {
  notification: any;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      console.log('params: ', params);
      if (params && params.notification) {
        this.notification = JSON.parse(params.notification);
      }
    });
  }

  ngOnInit(): void {}
}
