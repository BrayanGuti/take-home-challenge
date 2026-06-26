import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface PokemonDetails {
  id: number;
  name: string;
}

interface PokemonApiResponse {
  id: number;
  name: string;
}

@Injectable()
export class PokemonClient {
  private readonly baseUrl: string;

  constructor(configService: ConfigService) {
    this.baseUrl =
      configService.get<string>('POKEMON_API_BASE_URL') ??
      'https://pokeapi.co/api/v2';
  }

  async getPokemonById(id: number): Promise<PokemonApiResponse | null> {
    try {
      const response = await axios.get<PokemonApiResponse>(
        `${this.baseUrl}/pokemon/${id}`,
      );

      const data = response.data;

      return {
        id: data.id,
        name: data.name,
      };
    } catch (error) {
      console.error(`There was an error getting a pokemon by id ${error}`);
      return null;
    }
  }

  async getPokemonDetailsByIds(ids: number[]) {
    const pokemonPromises = ids.map((id) => this.getPokemonById(id));
    const pokemonResults = Promise.all(pokemonPromises);

    return (await pokemonResults).filter(
      (pokemon): pokemon is PokemonDetails => pokemon !== null,
    );
  }
}
