import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslationService {
  private readonly apiUrl = 'http://localhost:5000/translate';

  async batchTranslate(
    texts: string[],
    origLang: string,
    targetLang: string,
  ): Promise<string[]> {
    if (origLang === targetLang) return texts;
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          q: texts,
          source: origLang,
          target: targetLang,
          format: 'text',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      return response.data.translatedText;
    } catch (error) {
      console.error('Error during batch translation:', error.message);

      // In case the entire request failed, we could potentially return the english fallback.
      //as a design decision, and because the user can choose EN at the UI, I have decided to throw an error in order notify the user,
      throw new HttpException(
        'Failed to translate texts. Please try again later or contanct the support team.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
