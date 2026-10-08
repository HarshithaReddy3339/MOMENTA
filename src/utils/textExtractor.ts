import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF worker for browser environments
if (typeof window !== 'undefined') {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  } catch (e) {
    console.warn('PDF.js worker initialization warning:', e);
  }
}

/**
 * Fallback PDF text stream extractor for offline/sandboxed environments
 */
function extractTextFromPdfBuffer(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let raw = '';
  // Convert binary to string safely in chunks
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    raw += String.fromCharCode.apply(null, Array.from(chunk));
  }

  const textPieces: string[] = [];
  // Match text within BT ... ET blocks and string literals / TJ arrays
  const btRegex = /BT[\s\S]*?ET/g;
  let match: RegExpExecArray | null;

  while ((match = btRegex.exec(raw)) !== null) {
    const block = match[0];
    // Find strings like (Text here) or [ (Text) 12 (More) ]
    const strRegex = /\(([^)]+)\)/g;
    let strMatch: RegExpExecArray | null;
    while ((strMatch = strRegex.exec(block)) !== null) {
      const clean = strMatch[1]
        .replace(/\\([()\\])/g, '$1')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .trim();
      if (clean) textPieces.push(clean);
    }
  }

  return textPieces.join(' ').replace(/\s+/g, ' ').trim();
}

/**
 * Extracts plain text from an uploaded File (PDF, TXT, DOCX, DOC)
 */
export async function extractTextFromFile(file: File): Promise<{ text: string; wordCount: number }> {
  const fileName = file.name.toLowerCase();
  let extractedText = '';

  if (fileName.endsWith('.txt') || fileName.endsWith('.md') || file.type.startsWith('text/')) {
    // Standard plain text
    extractedText = await file.text();
  } else if (fileName.endsWith('.docx')) {
    // Modern Word document (DOCX)
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    extractedText = result.value || '';
  } else if (fileName.endsWith('.pdf')) {
    // PDF extraction using pdfjs-dist with fallback
    const arrayBuffer = await file.arrayBuffer();
    try {
      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
      const pdf = await loadingTask.promise;
      const textParts: string[] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => ('str' in item ? item.str : ''))
          .join(' ');
        if (pageText.trim()) {
          textParts.push(pageText.trim());
        }
      }

      extractedText = textParts.join('\n\n');
    } catch (pdfErr) {
      console.warn('PDF.js failed, attempting fallback text stream parsing:', pdfErr);
      extractedText = extractTextFromPdfBuffer(arrayBuffer);
      if (!extractedText) {
        throw new Error('Unable to extract text from this PDF document. The file may be image-only or password-protected.');
      }
    }
  } else if (fileName.endsWith('.doc')) {
    // Older binary Word format (.doc)
    const arrayBuffer = await file.arrayBuffer();
    try {
      const result = await mammoth.extractRawText({ arrayBuffer });
      extractedText = result.value || '';
    } catch {
      // Fallback: extract printable ASCII strings
      const bytes = new Uint8Array(arrayBuffer);
      let s = '';
      for (let i = 0; i < bytes.length; i++) {
        const b = bytes[i];
        if ((b >= 32 && b <= 126) || b === 10 || b === 13) {
          s += String.fromCharCode(b);
        }
      }
      extractedText = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').replace(/\s+/g, ' ').trim();
    }
  } else {
    // Generic fallback: try reading as text
    extractedText = await file.text();
  }

  const cleanText = extractedText.trim();
  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];

  return {
    text: cleanText,
    wordCount: words.length
  };
}
