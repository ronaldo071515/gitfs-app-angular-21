import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gifs-list/gif-list/gif-list";
import { GiftService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  
  gifService = inject( GiftService );
  gifs = signal<Gif[]>([]);
  
  onSearch(query: string) {

    this.gifService.searchGifs( query )
      .subscribe(resp => {
        console.log(resp)
      })

  }

}
