import { Injectable } from '@nestjs/common';
import { SwapiClient } from './swapi.client';
import { Film } from 'src/films/film.model';
import { Person } from 'src/people/person.model';
import { Planet } from 'src/planets/planet.model';
import { Species } from 'src/species/species.model';
import { Starship } from 'src/starships/starship.model';
import { Vehicle } from 'src/vehicles/vehicle.model';

@Injectable()
export class SwapiService {
  constructor(private swapiClient: SwapiClient) {}

  async getFilmById(id: string) {
    return this.swapiClient.fetchResourceById<Film>('films', id);
  }

  async getFilms(search?: string, filter?: { filterType: string; filterValue: string }) {
    return this.swapiClient.getResource<Film>('films', search, filter);
  }

  async getPersonById(id: string) {
    return this.swapiClient.fetchResourceById<Person>('people', id);
  }

  async getPeople(search?: string, filter?: { filterType: string; filterValue: string }) {
    return this.swapiClient.getResource<Person>('people', search, filter);
  }

  async getPlanetById(id: string) {
    return this.swapiClient.fetchResourceById<Planet>('planets', id);
  }

  async getPlanets(search?: string, filter?: { filterType: string; filterValue: string }) {
    return await this.swapiClient.getResource<Planet>('planets', search, filter);
  }

  async getSpeciesById(id: string) {
    return this.swapiClient.fetchResourceById<Species>('species', id);
  }

  async getSpecies(search?: string, filter?: { filterType: string; filterValue: string }) {
    return this.swapiClient.getResource<Species>('species', search, filter);
  }

  async getStarshipById(id: string) {
    return this.swapiClient.fetchResourceById<Starship>('starships', id);
  }

  async getStarships(search?: string, filter?: { filterType: string; filterValue: string }) {
    return this.swapiClient.getResource<Starship>('starships', search, filter);
  }

  async getVehicleById(id: string) {
    return this.swapiClient.fetchResourceById<Vehicle>('vehicles', id);
  }

  async getVehicles(search?: string, filter?: { filterType: string; filterValue: string }) {
    return this.swapiClient.getResource<Vehicle>('vehicles', search, filter);
  }
}
