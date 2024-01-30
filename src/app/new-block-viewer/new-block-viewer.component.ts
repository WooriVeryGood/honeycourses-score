// Copyright (C) 2024 Joonwoo Jang
//
// This file is part of honeycourses-pku-scores
//
// honeycourses-pku-scores is a free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// honeycourses-pku-scores is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with honeycourses-pku-scores.  If not, see <http://www.gnu.org/licenses/>.

import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, switchMap } from 'rxjs';
import { colorizeNewBlock } from '../colorize';
import { DataService } from '../data.service';
import { calcGpa } from '../score_parser';
import { shownScoreHelper } from '../shown_score_helper';

@UntilDestroy()
@Component({
  selector: 'app-new-block-viewer',
  templateUrl: './new-block-viewer.component.html',
  styleUrls: ['./new-block-viewer.component.scss'],
})
export class NewBlockViewerComponent {
  constructor(private dataService: DataService) {}

  hidden = false;
  courses: number[] = [];

  deltaGpa = 0;
  deltaType: 'up' | 'down' | 'keep' = 'keep';

  #subscription = this.dataService.scores$
    .pipe(
      switchMap(({ courses }) =>
        this.dataService.newBlock$.pipe(
          map((newBlock) => ({
            courses,
            newBlock,
          }))
        )
      ),
      untilDestroyed(this)
    )
    .subscribe(({ courses, newBlock }) => {
      this.courses = newBlock;
      const newGpa = calcGpa(courses);
      const oldGpa = calcGpa(courses.filter((_, i) => !newBlock.includes(i)));
      this.deltaGpa = Number(newGpa) - Number(oldGpa);
      this.deltaType =
        this.deltaGpa >= 0.0005
          ? 'up'
          : this.deltaGpa <= -0.0005
          ? 'down'
          : 'keep';

      if (newBlock.length > 0 && Notification.permission === 'granted')
        new Notification(`新增 ${newBlock.length} 门成绩`, {
          body: `${newBlock.map((co) => courses[co].name).join('、')}`,
        });
    });

  colorizeNewBlock = colorizeNewBlock;

  done() {
    this.hidden = true;
    setTimeout(() => this.dataService.dismissNewBlock(), 250);
  }

  fix(d: number) {
    if (Math.abs(d) >= 1) return d.toFixed(2); // -1.23
    else return d.toFixed(3).replace('0.', '.'); // -.234
  }
}
