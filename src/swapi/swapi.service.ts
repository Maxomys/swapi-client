import { Injectable } from '@nestjs/common';
import { SwapiClient } from './swapi.client';
import { Film } from 'src/films/film.model';
import { Person } from 'src/people/person.model';
import { Planet } from 'src/planets/planet.model';
import { Species } from 'src/species/species.model';
import { Starship } from 'src/starships/starship.model';
import { Vehicle } from 'src/vehicles/vehicle.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SwapiService {
  constructor(private swapiClient: SwapiClient) {}

  async getFilmById(id: string) {
    const film = this.swapiClient.getResourceById<Film>('films', id);
    return plainToInstance(Film, film);
  }

  async getFilms(search?: string, filter?: { filterType: string; filterValue: string }) {
    const films = await this.swapiClient.getResource<Film>('films', search, filter);
    return plainToInstance(Film, films);
  }

  async getPersonById(id: string) {
    const person = this.swapiClient.getResourceById<Person>('people', id);
    return plainToInstance(Person, person);
  }

  async getPeople(search?: string, filter?: { filterType: string; filterValue: string }) {
    const people = await this.swapiClient.getResource<Person>('people', search, filter);
    return plainToInstance(Person, people);
  }

  async getPlanetById(id: string) {
    const planet = this.swapiClient.getResourceById<Planet>('planets', id);
    return plainToInstance(Planet, planet);
  }

  async getPlanets(search?: string, filter?: { filterType: string; filterValue: string }) {
    const planets = await this.swapiClient.getResource<Planet>('planets', search, filter);
    return plainToInstance(Planet, planets);
  }

  async getSpeciesById(id: string) {
    const species = this.swapiClient.getResourceById<Species>('species', id);
    return plainToInstance(Species, species);
  }

  async getSpecies(search?: string, filter?: { filterType: string; filterValue: string }) {
    const speciesList = await this.swapiClient.getResource<Species>('species', search, filter);
    return plainToInstance(Species, speciesList);
  }

  async getStarshipById(id: string) {
    const starship = this.swapiClient.getResourceById<Starship>('starships', id);
    return plainToInstance(Starship, starship);
  }

  async getStarships(search?: string, filter?: { filterType: string; filterValue: string }) {
    const starships = await this.swapiClient.getResource<Starship>('starships', search, filter);
    return plainToInstance(Starship, starships);
  }

  async getVehicleById(id: string) {
    const vehicle = this.swapiClient.getResourceById<Vehicle>('vehicles', id);
    return plainToInstance(Vehicle, vehicle);
  }

  async getVehicles(search?: string, filter?: { filterType: string; filterValue: string }) {
    const vehicles = await this.swapiClient.getResource<Vehicle>('vehicles', search, filter);
    return plainToInstance(Vehicle, vehicles);
  }
}
