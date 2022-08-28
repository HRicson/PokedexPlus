import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'

import { PokemonsResponse, PokedexResponse, Pokedex } from '../models/pokedex-interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private URL_API: string = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151'

  constructor(private http: HttpClient) { }

  get apiListAllPokemons(): Observable<PokedexResponse> {
    return this.http.get<PokedexResponse>(this.URL_API)
      .pipe(
        tap(pokedexResponse => pokedexResponse),
        tap(pokedexResponse => {

          console.log(pokedexResponse)

          pokedexResponse.results
            .map((pokemonsResponse: PokemonsResponse) => {
              this
                .apiGetPokemons(pokemonsResponse.url)
                .subscribe(pokemonStatus => pokemonsResponse.pokemon_status = pokemonStatus)
            })
        })
      )
  }

  public apiGetPokemons(url: string): Observable<Pokedex> {
    return this.http.get<Pokedex>(url)
      .pipe(map(pokemonStatus => pokemonStatus))
  }
}
