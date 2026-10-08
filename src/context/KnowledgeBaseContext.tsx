import React, { createContext, useContext, useState, useEffect } from 'react';
import { extractTextFromFile } from '../utils/textExtractor';

export interface KnowledgeDocument {
  id: string;
  name: string;
  type: 'pdf' | 'txt' | 'docx' | 'doc' | 'other';
  size: number;
  uploadedAt: string;
  status: 'extracting' | 'ready' | 'error';
  extractedText: string;
  wordCount: number;
  errorMessage?: string;
}

interface KnowledgeBaseContextType {
  documents: KnowledgeDocument[];
  isProcessing: boolean;
  uploadFiles: (files: FileList | File[]) => Promise<void>;
  removeDocument: (id: string) => void;
  clearAllDocuments: () => void;
  getCombinedContext: () => string;
}

const KnowledgeBaseContext = createContext<KnowledgeBaseContextType | undefined>(undefined);

const STORAGE_KEY = 'momenta_rag_knowledge_base';

export const KnowledgeBaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Sync to sessionStorage for temporary session retention without using any cloud database
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (e) {
      console.warn('SessionStorage quota exceeded, storing in-memory only', e);
    }
  }, [documents]);

  const detectType = (fileName: string): KnowledgeDocument['type'] => {
    const lower = fileName.toLowerCase();
    if (lower.endsWith('.pdf')) return 'pdf';
    if (lower.endsWith('.txt') || lower.endsWith('.md')) return 'txt';
    if (lower.endsWith('.docx')) return 'docx';
    if (lower.endsWith('.doc')) return 'doc';
    return 'other';
  };

  const uploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsProcessing(true);

    // Initial placeholder records with 'extracting' status
    const newDocs: KnowledgeDocument[] = fileArray.map((file) => ({
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: detectType(file.name),
      size: file.size,
      uploadedAt: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      status: 'extracting',
      extractedText: '',
      wordCount: 0
    }));

    setDocuments((prev) => [...newDocs, ...prev]);

    // Process extraction in parallel
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const targetDocId = newDocs[i].id;

      try {
        const { text, wordCount } = await extractTextFromFile(file);
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === targetDocId
              ? {
                  ...d,
                  status: 'ready',
                  extractedText: text,
                  wordCount
                }
              : d
          )
        );
      } catch (err: any) {
        console.error(`Failed to extract text from ${file.name}:`, err);
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === targetDocId
              ? {
                  ...d,
                  status: 'error',
                  errorMessage: err?.message || 'Failed to extract text.'
                }
              : d
          )
        );
      }
    }

    setIsProcessing(false);
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const clearAllDocuments = () => {
    setDocuments([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const getCombinedContext = (): string => {
    return documents
      .filter((d) => d.status === 'ready' && d.extractedText)
      .map((d) => `=== DOCUMENT: ${d.name} (${d.type.toUpperCase()}) ===\n${d.extractedText}`)
      .join('\n\n');
  };

  return (
    <KnowledgeBaseContext.Provider
      value={{
        documents,
        isProcessing,
        uploadFiles,
        removeDocument,
        clearAllDocuments,
        getCombinedContext
      }}
    >
      {children}
    </KnowledgeBaseContext.Provider>
  );
};

export const useKnowledgeBase = () => {
  const context = useContext(KnowledgeBaseContext);
  if (!context) {
    throw new Error('useKnowledgeBase must be used within a KnowledgeBaseProvider');
  }
  return context;
};
