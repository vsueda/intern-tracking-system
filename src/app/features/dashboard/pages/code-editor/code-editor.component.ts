import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MonacoEditorModule
  ],
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  editorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    fontSize: 14,
    automaticLayout: true,
    minimap: { enabled: false }
  };
  
  code: string = '// Kodunuzu buraya yazın';
  output: string = '';

  constructor() {}

  ngOnInit(): void {}

  runCode() {
    try {
      const result = eval(this.code);
      this.output = String(result);
    } catch (error) {
      this.output = `Hata: ${error}`;
    }
  }
} 