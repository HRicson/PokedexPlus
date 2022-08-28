import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { forkJoin } from 'rxjs';

import { PokeApiService } from './../../service/pokeapi.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private URL_POKEMON: string = 'https://pokeapi.co/api/v2/pokemon';
  private URL_DETAILS: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokedex: any;
  public isLoading: boolean = true;
  public apiHasError: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {

    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.URL_POKEMON}/${id}`);
    const name = this.pokeApiService.apiGetPokemons(`${this.URL_DETAILS}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokedex = res;
        this.isLoading = false;
      },
      error => {
        this.apiHasError = true;
      }
    )
  }
}
