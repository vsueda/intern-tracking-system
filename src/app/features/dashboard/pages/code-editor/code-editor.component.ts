import { Component, OnInit, PLATFORM_ID, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';
import { appConfig } from '../../../../app.config';

interface Question {
  id: number;
  title: string;
  description: string;
  testCases: { input: any[]; expectedOutput: any }[];
}

interface StarterCode {
  [key: string]: string;
}

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MonacoEditorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      title: 'İki Sayının Toplamı',
      description: 'Verilen iki sayıyı toplayan bir fonksiyon yazın.',
      testCases: [
        { input: [2, 3], expectedOutput: 5 },
        { input: [-1, 5], expectedOutput: 4 },
        { input: [0, 0], expectedOutput: 0 }
      ]
    },
    {
      id: 2,
      title: 'Palindrom Kontrolü',
      description: 'Verilen bir string\'in palindrom olup olmadığını kontrol eden bir fonksiyon yazın. (Palindrom: Tersten okunuşu aynı olan kelime/cümle)',
      testCases: [
        { input: ['kayak'], expectedOutput: true },
        { input: ['hello'], expectedOutput: false },
        { input: [''], expectedOutput: true }
      ]
    },
    {
      id: 3,
      title: 'Dizi Elemanlarının Toplamı',
      description: 'Verilen bir sayı dizisinin tüm elemanlarının toplamını bulan bir fonksiyon yazın.',
      testCases: [
        { input: [[1, 2, 3, 4, 5]], expectedOutput: 15 },
        { input: [[-1, -2, 0, 3]], expectedOutput: 0 },
        { input: [[]], expectedOutput: 0 }
      ]
    }
  ];

  currentQuestion: Question;
  selectedLanguage = 'javascript';
  languages = [
    { value: 'javascript', viewValue: 'JavaScript' },
    { value: 'typescript', viewValue: 'TypeScript' },
    { value: 'python', viewValue: 'Python' },
    { value: 'java', viewValue: 'Java' }
  ];

  editorOptions = appConfig.monacoConfig.defaultOptions;
  
  code: string = '';
  output: string = 'Henüz bir çıktı yok';
  testResults: any[] = [];

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentQuestion = this.questions[0];

    if (this.isBrowser) {
      (window as any).MonacoEnvironment = {
        getWorkerUrl: function(_moduleId: string, label: string) {
          if (label === 'typescript' || label === 'javascript') {
            return '/assets/monaco-editor/min/vs/language/typescript/tsWorker.js';
          }
          return '/assets/monaco-editor/min/vs/editor/editor.worker.js';
        }
      };
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.setInitialCode();
    }
  }

  setInitialCode() {
    const starterCode: StarterCode = {
      'javascript': this.getStarterCodeForQuestion(this.currentQuestion.id),
      'python': this.getPythonStarterCode(this.currentQuestion.id),
      'java': this.getJavaStarterCode(this.currentQuestion.id)
    };
    this.code = starterCode[this.selectedLanguage] || starterCode['javascript'];
  }

  private getStarterCodeForQuestion(questionId: number): string {
    switch(questionId) {
      case 1:
        return `function sum(a, b) {
  // İki sayıyı toplayan kodu yazın
  
}`;
      case 2:
        return `function isPalindrome(str) {
  // Palindrom kontrolü yapan kodu yazın
  
}`;
      case 3:
        return `function arraySum(numbers) {
  // Dizi elemanlarının toplamını bulan kodu yazın
  
}`;
      default:
        return '// Kodunuzu buraya yazın';
    }
  }

  private getPythonStarterCode(questionId: number): string {
    switch(questionId) {
      case 1:
        return `def sum(a, b):
    # İki sayıyı toplayan kodu yazın
    pass`;
      case 2:
        return `def is_palindrome(str):
    # Palindrom kontrolü yapan kodu yazın
    pass`;
      case 3:
        return `def array_sum(numbers):
    # Dizi elemanlarının toplamını bulan kodu yazın
    pass`;
      default:
        return '# Kodunuzu buraya yazın';
    }
  }

  private getJavaStarterCode(questionId: number): string {
    switch(questionId) {
      case 1:
        return `public class Solution {
    public int sum(int a, int b) {
        // İki sayıyı toplayan kodu yazın
        
    }
}`;
      case 2:
        return `public class Solution {
    public boolean isPalindrome(String str) {
        // Palindrom kontrolü yapan kodu yazın
        
    }
}`;
      case 3:
        return `public class Solution {
    public int arraySum(int[] numbers) {
        // Dizi elemanlarının toplamını bulan kodu yazın
        
    }
}`;
      default:
        return '// Kodunuzu buraya yazın';
    }
  }

  onLanguageChange() {
    this.editorOptions = {
      ...this.editorOptions,
      language: this.selectedLanguage
    };
    this.setInitialCode();
  }

  selectQuestion(questionId: number) {
    this.currentQuestion = this.questions.find(q => q.id === questionId) || this.questions[0];
    this.setInitialCode();
    this.output = 'Henüz bir çıktı yok';
    this.testResults = [];
  }

  runCode() {
    try {
      // Güvenlik nedeniyle eval kullanımı gerçek uygulamada önerilmez
      const result = eval(this.code);
      this.output = String(result);
      this.runTests();
    } catch (error) {
      this.output = `Hata: ${error}`;
    }
  }

  runTests() {
    this.testResults = this.currentQuestion.testCases.map(testCase => {
      try {
        const result = eval(`(${this.code})(${testCase.input.join(',')})`);
        return {
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: result,
          passed: result === testCase.expectedOutput
        };
      } catch (error) {
        return {
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: 'Hata',
          passed: false
        };
      }
    });
  }
} 