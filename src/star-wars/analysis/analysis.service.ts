import { Injectable } from '@nestjs/common';
import { SwapiService } from 'src/swapi/swapi.service';
import { Person } from '../people/person.model';
import { UniqueWord } from './unique-word.model';

@Injectable()
export class AnalysisService {
  constructor(private swapiService: SwapiService) {}

  async getMostMentionedCharacter() {
    const people = await this.swapiService.getPeople();

    return this.findMostMentionedCharacter(await this.getJoinedCrawls(), people);
  }

  private findMostMentionedCharacter(allOpenings: string, people: Person[]): string[] {
    const characterMentions: Record<string, number> = {};
    const matchExactName = this.matchExactName;

    people.forEach((person) => {
      const name = person.name.toLowerCase();
      const occurrences = matchExactName(allOpenings, name);
      if (occurrences > 0) {
        characterMentions[person.name] = occurrences;
      }
    });

    const maxMentions = Math.max(...Object.values(characterMentions));
    return Object.entries(characterMentions)
      .filter(([, count]) => count === maxMentions)
      .map(([name]) => name);
  }

  private matchExactName(text: string, name: string): number {
    const regex = new RegExp(`\\b${name}\\b`, 'g');
    return (text.match(regex) || []).length;
  }

  async getUniqueWords(): Promise<UniqueWord[]> {
    const jointCrawls = await this.getJoinedCrawls();

    const wordCounts: Record<string, number> = {};

    const words = this.cleanAndSplitText(jointCrawls);
    const uniqueWordsInCrawl = new Set(words); // Get only unique words from this crawl
    console.log(uniqueWordsInCrawl)

    uniqueWordsInCrawl.forEach(key => {
      wordCounts[key] = 0;
    });

    words.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    return Object.entries(wordCounts).map(([word, count]) => ({ word, count }));
  }

  private cleanAndSplitText(text: string): string[] {
    return text
      .replace(/[\r\n]+/g, ' ') // Replace control characters (\r\n, \n, \r) with a space
      .replace(/[^a-zA-Z0-9\s]+/g, '') // Remove non-alphanumeric characters, keeping spaces
      .toLowerCase() // Normalize to lowercase
      .split(/\s+/) // Split by one or more spaces
      .filter((word) => word.trim().length > 0); // Remove empty or whitespace-only entries
  }

  private async getJoinedCrawls() {
    const films = await this.swapiService.getFilms();

    return films
      .map((film) => film.opening_crawl)
      .join(' ')
      .toLowerCase();
  }
}
