export interface TestCase {
  input: any[];
  expectedOutput: any;
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  category: string;
  testCases: TestCase[];
  starterCode: string;
  solution?: string;
} 