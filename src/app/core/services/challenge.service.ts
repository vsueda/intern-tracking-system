import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Challenge } from '../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private challenges: Challenge[] = [
    {
      id: '1',
      title: 'İki Sayının Toplamı',
      description: 'İki sayıyı parametre olarak alan ve bu sayıların toplamını döndüren bir fonksiyon yazın.',
      difficulty: 'Kolay',
      category: 'Temel İşlemler',
      testCases: [
        {
          input: [5, 3],
          expectedOutput: 8,
          description: '5 + 3 = 8'
        },
        {
          input: [-1, 1],
          expectedOutput: 0,
          description: '-1 + 1 = 0'
        },
        {
          input: [0, 0],
          expectedOutput: 0,
          description: '0 + 0 = 0'
        }
      ],
      starterCode: `function topla(a, b) {
  // Kodunuzu buraya yazın
}`,
      solution: `function topla(a, b) {
  return a + b;
}`
    },
    {
      id: '2',
      title: 'Dizi Elemanlarının Toplamı',
      description: 'Bir sayı dizisi alan ve bu dizideki tüm elemanların toplamını döndüren bir fonksiyon yazın.',
      difficulty: 'Kolay',
      category: 'Diziler',
      testCases: [
        {
          input: [[1, 2, 3, 4, 5]],
          expectedOutput: 15,
          description: '[1, 2, 3, 4, 5] dizisinin toplamı 15'
        },
        {
          input: [[-1, -2, 0, 1, 2]],
          expectedOutput: 0,
          description: '[-1, -2, 0, 1, 2] dizisinin toplamı 0'
        },
        {
          input: [[10]],
          expectedOutput: 10,
          description: '[10] dizisinin toplamı 10'
        },
        {
          input: [[]],
          expectedOutput: 0,
          description: 'Boş dizinin toplamı 0'
        }
      ],
      starterCode: `function diziToplamı(dizi) {
  // Kodunuzu buraya yazın
}`,
      solution: `function diziToplamı(dizi) {
  return dizi.reduce((toplam, sayi) => toplam + sayi, 0);
}`
    }
  ];

  private challengesSubject = new BehaviorSubject<Challenge[]>(this.challenges);

  getChallenges(): Observable<Challenge[]> {
    return this.challengesSubject.asObservable();
  }

  addChallenge(challenge: Challenge): void {
    this.challenges.push(challenge);
    this.challengesSubject.next(this.challenges);
  }

  updateChallenge(challenge: Challenge): void {
    const index = this.challenges.findIndex(c => c.id === challenge.id);
    if (index !== -1) {
      this.challenges[index] = challenge;
      this.challengesSubject.next(this.challenges);
    }
  }

  deleteChallenge(id: string): void {
    this.challenges = this.challenges.filter(c => c.id !== id);
    this.challengesSubject.next(this.challenges);
  }
} 