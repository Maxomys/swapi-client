import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Analysis } from './analysis.model';
import { AnalysisService } from './analysis.service';
import { UniqueWord } from './unique-word.model';

@Resolver(() => Analysis)
export class AnalysisResolver {
  constructor(private analysisService: AnalysisService) {}

  @Query(() => Analysis, { description: 'Unique words in the opening crawls of all films.' })
  async analysis() {
    const analysis = new Analysis();
    analysis.most_mentioned_character = await this.analysisService.getMostMentionedCharacter();
    return analysis;
  }

  @ResolveField(() => [UniqueWord], { name: 'unique_words' })
  async uniqueWords() {
    return this.analysisService.getUniqueWords();
  }
}
