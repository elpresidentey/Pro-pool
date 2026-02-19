import { useState } from 'react';
import type { ChangeEvent } from 'react';

interface ImageUploadProps {
  onUpload?: (file: File) => Promise<void>;
  onFileSelect?: (file: File) => void;
  maxSizeMB?: number;
  label?: string;
}

export default function ImageUpload({
  onUpload,
  onFileSelect,
  maxSizeMB = 5,
  label = 'Upload Image',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return 'Only JPG, PNG, and WebP images are supported';
    }

    return null;
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Call appropriate callback
    if (onFileSelect) {
      // Sync callback for simple file selection
      onFileSelect(file);
    } else if (onUpload) {
      // Async callback for actual upload
      setLoading(true);
      setError(null);

      try {
        await onUpload(file);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
        setPreview(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  return (
    <div className="w-full">
      {/* Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-card p-8 text-center transition-colors ${
          isDragging ? 'border-electric-blue bg-blue-50' : 'border-border-color'
        }`}
      >
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={loading}
        />

        <label htmlFor="image-upload" className="cursor-pointer">
          {loading ? (
            <>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mb-2"></div>
              <p className="text-text-secondary">Uploading...</p>
            </>
          ) : (
            <>

              <p className="font-medium text-text-primary">{label}</p>
              <p className="text-sm text-text-secondary">
                Drag and drop or click to select. Max {maxSizeMB}MB
              </p>
            </>
          )}
        </label>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-4">
          <p className="text-sm font-medium text-text-primary mb-2">Preview</p>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-card"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-button">
          {error}
        </div>
      )}
    </div>
  );
}
