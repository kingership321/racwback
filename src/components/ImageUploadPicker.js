import React, { useEffect, useState } from 'react';
import { FaImage, FaUpload } from 'react-icons/fa';
import api from '../services/api';
import './ImageUploadPicker.css';

const ImageUploadPicker = ({
  label = 'Image URL',
  value = '',
  onChange,
  uploadFolder = 'uploads',
  showUrlInput = true,
  libraryTitle = 'Uploaded images',
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [manualUrl, setManualUrl] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const [library, setLibrary] = useState([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setManualUrl(value || '');
  }, [value]);

  useEffect(() => {
    if (!selectedFile) {
      setFilePreview('');
      return undefined;
    }

    const previewUrl = URL.createObjectURL(selectedFile);
    setFilePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [selectedFile]);

  useEffect(() => {
    fetchLibrary();
  }, [uploadFolder]);

  const fetchLibrary = async () => {
    try {
      setLoadingLibrary(true);
      const res = await api.get('/uploads', {
        params: {
          path: uploadFolder,
        },
      });
      setLibrary(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      console.error('Image library fetch failed', err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleFileChange = (event) => {
    setError('');
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Select a file before uploading.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('path', uploadFolder);

      const res = await api.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res?.data?.url) {
        onChange(res.data.url);
        setManualUrl(res.data.url);
        setSelectedFile(null);
        setFilePreview('');
        fetchLibrary();
      }
    } catch (err) {
      console.error('Upload failed', err);
      setError(err.response?.data?.error || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleManualUrlChange = (event) => {
    const nextUrl = event.target.value;
    setManualUrl(nextUrl);
    onChange(nextUrl);
  };

  const selectLibraryImage = (url) => {
    onChange(url);
    setManualUrl(url);
    setSelectedFile(null);
    setFilePreview('');
  };

  return (
    <div className="image-upload-picker">
      <div className="image-upload-picker__label-row">
        <label>{label}</label>
        {error && <span className="image-upload-picker__error">{error}</span>}
      </div>

      {showUrlInput && (
        <input
          type="url"
          value={manualUrl}
          onChange={handleManualUrlChange}
          placeholder="Paste image URL or choose one below"
          className="image-upload-picker__url-input"
        />
      )}

      <div className="image-upload-picker__upload-row">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="image-upload-picker__file-input"
        />
        <button
          type="button"
          className="btn-admin btn-admin--secondary image-upload-picker__upload-button"
          onClick={handleUpload}
          disabled={uploading}
        >
          <FaUpload /> {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {(filePreview || value) && (
        <div className="image-upload-picker__preview">
          <div className="image-upload-picker__preview-label">Preview</div>
          <img src={filePreview || value} alt="Selected" />
        </div>
      )}

      <div className="image-upload-picker__library">
        <div className="image-upload-picker__library-header">
          <FaImage />
          <span>{libraryTitle}</span>
        </div>
        {loadingLibrary ? (
          <p className="image-upload-picker__loading">Loading uploaded images...</p>
        ) : library.length === 0 ? (
          <p className="image-upload-picker__empty">No uploaded images yet.</p>
        ) : (
          <div className="image-upload-picker__library-grid">
            {library.map((item) => (
              <button
                key={item.path}
                type="button"
                className={`image-upload-picker__library-item${item.url === value ? ' selected' : ''}`}
                onClick={() => selectLibraryImage(item.url)}
              >
                <img src={item.url} alt={item.name} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadPicker;
