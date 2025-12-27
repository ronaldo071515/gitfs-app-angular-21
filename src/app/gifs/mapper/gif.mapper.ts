import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from './../interfaces/giphy.interfaces';
// recibir el objeto que viene de la api y retornar un objeto basado en la interfaz que necesitamos

export class GifMapper {

    static mapGiphyItemToGif(giphyItem: GiphyItem): Gif {

        return {
            id: giphyItem.id,
            title: giphyItem.title,
            url: giphyItem.images.original.url
        }

    }

    static mapGiphyItemsTogifArray(items: GiphyItem[]): Gif[] {
        return items.map( this.mapGiphyItemToGif )
    }

}