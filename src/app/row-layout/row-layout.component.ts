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

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-row-layout',
  templateUrl: './row-layout.component.html',
  styleUrls: ['./row-layout.component.scss']
})
export class RowLayoutComponent implements OnInit {

  constructor() { }

  @Input() background = "unset";

  /** 启用彩虹色滚动动画 */
  @Input() rainbow = false;

  ngOnInit(): void {
  }

}
