import { Gif } from './../interfaces/gif.interface';
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import type { GiphyResonse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GiftService {

    /* https://api.giphy.com/v1/gifs/search?api_key=B0tMpPwj5n1GCWOPW4794JL6BT6FUthY&q=hola&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips */

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    constructor() {
        this.loadTrendingGifs();
        console.log('servicio creado');
    }


    loadTrendingGifs() {

        this.http.get<GiphyResonse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20
            }
        }).subscribe((resp) => {

            const gifs = GifMapper.mapGiphyItemsTogifArray(resp.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
            // console.log(gifs);

        })

    }


    searchGifs(query: string) {
        return this.http.get<GiphyResonse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query
            }
        })
        .pipe(
            //operadores rxjs nos permite transformar las emiciones de los observables
            map(( resp ) => `Hola mundo: ${ resp.data.length }` )
        )

        //metodo pipe me permite encadenar funcionamientos especiales de los observables
        // .pipe(
        //     //tap() sirve para disparar efectos secundarios
        //     tap( resp => console.log({tap: resp}))
        // )
        // .subscribe((resp) => {

        //     const gifs = GifMapper.mapGiphyItemsTogifArray(resp.data);
        //     // console.log({search: gifs});

        // })

    }

}