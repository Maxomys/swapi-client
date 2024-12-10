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
    const film = this.swapiClient.fetchResourceById<Film>('films', id);
    return plainToInstance(Film, film);
  }

  async getFilms(search?: string, filter?: { filterType: string; filterValue: string }) {
    const films = await this.swapiClient.getResource<Film>('films', search, filter);
    return films.map((film) => plainToInstance(Film, film));
  }

  async getPersonById(id: string) {
    const person = this.swapiClient.fetchResourceById<Person>('people', id);
    return plainToInstance(Person, person);
  }

  async getPeople(search?: string, filter?: { filterType: string; filterValue: string }) {
    const people = await this.swapiClient.getResource<Person>('people', search, filter);
    return people.map((person) => plainToInstance(Person, person));
  }

  async getPlanetById(id: string) {
    const planet = this.swapiClient.fetchResourceById<Planet>('planets', id);
    return plainToInstance(Planet, planet);
  }

  async getPlanets(search?: string, filter?: { filterType: string; filterValue: string }) {
    const planets = await this.swapiClient.getResource<Planet>('planets', search, filter);
    return planets.map((planet) => plainToInstance(Planet, planet));
  }

  async getSpeciesById(id: string) {
    const species = this.swapiClient.fetchResourceById<Species>('species', id);
    return plainToInstance(Species, species);
  }

  async getSpecies(search?: string, filter?: { filterType: string; filterValue: string }) {
    const speciesList = await this.swapiClient.getResource<Species>('species', search, filter);
    return speciesList.map((species) => plainToInstance(Species, species));
  }

  async getStarshipById(id: string) {
    const starship = this.swapiClient.fetchResourceById<Starship>('starships', id);
    return plainToInstance(Starship, starship);
  }

  async getStarships(search?: string, filter?: { filterType: string; filterValue: string }) {
    const starships = await this.swapiClient.getResource<Starship>('starships', search, filter);
    return starships.map((starship) => plainToInstance(Starship, starship));
  }

  async getVehicleById(id: string) {
    const vehicle = this.swapiClient.fetchResourceById<Vehicle>('vehicles', id);
    return plainToInstance(Vehicle, vehicle);
  }

  async getVehicles(search?: string, filter?: { filterType: string; filterValue: string }) {
    const vehicles = await this.swapiClient.getResource<Vehicle>('vehicles', search, filter);
    return vehicles.map((vehicle) => plainToInstance(Vehicle, vehicle));
  }
}
