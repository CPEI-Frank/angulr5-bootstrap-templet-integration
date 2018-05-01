import { Injectable } from '@angular/core';
import { HnService } from './hn.service';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
@Injectable()
export class HnResolver implements Resolve<any> {
  constructor(private hnService: HnService) {}

  resolve() {
    return this.hnService.getTopPosts().catch(() => {
        return Observable.of('data not available at this time');
    });
  }
}

