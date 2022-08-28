import { Component, OnInit } from '@angular/core';

import { PokemonsResponse } from 'src/app/models/pokedex-interfaces';
import { PokeApiService } from './../../service/pokeapi.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  private setAllPokemons: PokemonsResponse[];
  public getAllPokemons: PokemonsResponse[];

  public apiHasError: boolean = false;
  public isLoading: boolean = true;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons
      .subscribe(response => {
        this.setAllPokemons = response.results
        this.getAllPokemons = this.setAllPokemons

        this.isLoading = false;
      },
        error => {
          this.apiHasError = true;
        })
  }

  public getSearch(value: string) {
    const filter = this.setAllPokemons
      .filter((res: any) => !res.name.indexOf(value.toLowerCase()))

    this.getAllPokemons = filter
  }
}
