'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db, isFirebaseConfigured } from '@/lib/firebase/clientApp';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/clientApp';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { FaFileAlt, FaUpload, FaSignOutAlt, FaDownload } from 'react-icons/fa';

interface DocumentRecord {
  id: string;
  filename: string;
  url: string;
  createdAt: any;
  size: number;
}

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const fetchDocuments = async () => {
    if (!user) return;
    if (!isFirebaseConfigured) {
      console.warn('Firebase not configured – cannot fetch documents');
      setLoadingDocs(false);
      return;
    }
    try {
      const q = query(
        collection(db, 'documents'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const docsData: DocumentRecord[] = [];
      querySnapshot.forEach((doc) => {
        docsData.push({ id: doc.id, ...doc.data() } as DocumentRecord);
      });
      setDocuments(docsData);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }

    if (!isSupabaseConfigured) {
      setUploadError('Supabase is not configured – cannot upload files.');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const filePath = `clients/${user.uid}/${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('client-documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('client-documents')
        .getPublicUrl(filePath);

      const downloadUrl = publicUrl;

      if (!isFirebaseConfigured) {
        console.warn('Firebase not configured – cannot store document metadata.');
        setUploadError('Document uploaded, but metadata cannot be saved (Firebase not configured).');
      } else {
        await addDoc(collection(db, 'documents'), {
          userId: user.uid,
          userEmail: user.email || user.phoneNumber || 'Unknown',
          filename: file.name,
          url: downloadUrl,
          size: file.size,
          createdAt: serverTimestamp(),
        });
      }

      await fetchDocuments();
      e.target.value = '';
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadError(error.message || 'Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!user) {
    return null; // should be redirected by layout
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-semibold text-navy-ink">Client Dashboard</h1>
          <p className="text-xs text-text-muted mt-1">Welcome back, <span className="num-ledger">{user?.email || user?.phoneNumber}</span></p>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center px-4 py-2 border border-border-gray rounded-[3px] text-xs font-semibold text-text-body bg-white hover:bg-bg-secondary focus:outline-none transition-colors btn-press"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-[3px] border border-border-gray">
            <h2 className="text-lg font-serif font-semibold text-navy-ink mb-4">Upload Document</h2>
            <p className="text-xs text-text-muted mb-6 leading-relaxed">
              Upload invoices, Form 16, or bank statements securely. Files are retained for 6 months.
            </p>

            {uploadError && (
              <div className="mb-4 text-xs text-accent-warning bg-white p-3 rounded-[3px] border border-accent-warning">
                {uploadError}
              </div>
            )}

            <div className="border-2 border-dashed border-border-gray rounded-[3px] p-8 text-center hover:bg-bg-secondary transition-colors">
              <FaUpload className="mx-auto text-2xl text-text-muted mb-3" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="block text-xs font-semibold text-navy-primary hover:text-navy-ink link-draw">Select a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
              <p className="mt-1 text-[10px] text-text-muted uppercase tracking-wider">PDF, XLSX, DOCX up to 10MB</p>
            </div>

            {uploading && (
              <div className="mt-4 flex items-center justify-center text-xs text-navy-primary">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy-primary mr-2"></div>
                Uploading...
              </div>
            )}
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[3px] border border-border-gray overflow-hidden">
            <div className="px-6 py-4 border-b border-border-gray bg-bg-secondary">
              <h2 className="text-lg font-serif font-semibold text-navy-ink">Your Documents</h2>
            </div>

            <div className="p-0">
              {loadingDocs ? (
                <div className="p-8 text-center text-xs text-text-muted">Loading documents...</div>
              ) : documents.length === 0 ? (
                <div className="p-16 text-center flex flex-col items-center">
                  <FaFileAlt className="text-3xl text-border-gray mb-4" />
                  <p className="text-xs text-text-muted">No documents uploaded yet.</p>
                </div>
              ) : (
                <ul className="divide-y divide-border-gray">
                  {documents.map((doc) => (
                    <li key={doc.id} className="p-5 hover:bg-bg-secondary transition-colors flex items-center justify-between">
                      <div className="flex items-start">
                        <FaFileAlt className="text-text-muted mt-0.5 mr-4 text-lg" />
                        <div>
                          <p className="text-xs font-semibold text-navy-ink">{doc.filename}</p>
                          <div className="mt-1 text-[10px] text-text-muted flex gap-4 uppercase tracking-wider">
                            <span className="num-ledger">{doc.createdAt ? new Date(doc.createdAt.toDate()).toLocaleDateString() : 'Just now'}</span>
                            <span className="num-ledger">{formatSize(doc.size)}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-navy-primary hover:text-navy-ink hover:bg-bg-secondary rounded-[3px] transition-colors btn-press"
                        title="Download"
                      >
                        <FaDownload />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
