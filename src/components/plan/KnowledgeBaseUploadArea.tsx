import React, { useRef, useState } from 'react';
import { useKnowledgeBase, KnowledgeDocument } from '../../context/KnowledgeBaseContext';
import { Upload, FileText, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const KnowledgeBaseUploadArea: React.FC = () => {
  const { documents, isProcessing, uploadFiles, removeDocument } = useKnowledgeBase();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full space-y-3 pt-2 pb-1">
      {/* Upload Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all duration-200 bg-white/70 hover:bg-white ${
          dragActive
            ? 'border-[#D96035] bg-[#FDEEE7]/60'
            : 'border-[#E2D2C5] hover:border-[#D96035]/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.txt,.docx,.doc,.md,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-1.5">
          <div className="w-9 h-9 rounded-full bg-[#FAF0E8] text-[#D96035] flex items-center justify-center">
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#D96035]" />
            ) : (
              <Upload className="w-4 h-4 text-[#D96035]" />
            )}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#261F1D]">
              Click or drag & drop event knowledge files
            </p>
            <p className="text-[11px] text-[#7A6B63] mt-0.5">
              Supports <span className="font-semibold text-[#5A4D46]">PDF</span>, <span className="font-semibold text-[#5A4D46]">TXT</span>, or <span className="font-semibold text-[#5A4D46]">DOC/DOCX</span> (menus, vendor ratecards, personal briefs)
            </p>
          </div>
        </div>
      </div>

      {/* Uploaded Files Status List */}
      {documents.length > 0 && (
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {documents.map((doc: KnowledgeDocument) => (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-2.5 p-2 px-3 rounded-lg bg-white border border-[#EDE2D8] text-xs shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-3.5 h-3.5 text-[#D96035] shrink-0" />
                <span className="font-medium text-[#261F1D] truncate max-w-[180px] sm:max-w-xs">
                  {doc.name}
                </span>
                <span className="text-[10px] uppercase font-mono px-1 rounded bg-[#FAF0E8] text-[#7A6B63] shrink-0">
                  {doc.type}
                </span>
                <span className="text-[11px] text-[#8C7B73] shrink-0 hidden sm:inline">
                  {formatFileSize(doc.size)}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {doc.status === 'extracting' && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-700">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Extracting...</span>
                  </span>
                )}
                {doc.status === 'ready' && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-green-700 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    <span>Ready</span>
                  </span>
                )}
                {doc.status === 'error' && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-red-700 font-medium" title={doc.errorMessage}>
                    <AlertCircle className="w-3 h-3 text-red-600" />
                    <span>Failed</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeDocument(doc.id)}
                  className="p-1 rounded text-[#8C7B73] hover:text-[#C53030] hover:bg-[#FEE2E2]/60 transition-colors cursor-pointer"
                  title="Remove file"
                  aria-label={`Remove ${doc.name}`}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
