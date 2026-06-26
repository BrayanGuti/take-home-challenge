import { Provider } from '@nestjs/common';
import { PokemonClient } from './pokemon.client';

export const CLientsProviders: Provider[] = [PokemonClient];
