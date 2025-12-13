import { Component } from '@angular/core';
import { GifList } from "../../components/gifs-list/gif-list/gif-list";

@Component({
  selector: 'trending-page',
  imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage { }
