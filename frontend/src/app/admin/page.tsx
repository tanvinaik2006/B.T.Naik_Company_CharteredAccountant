'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db, isFirebaseConfigured } from '@/lib/firebase/clientApp';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { FaFileAlt, FaDownload, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface DocumentRecord {
  id: string;
  userId: string;
  userEmail: string;
  filename: string;
  url: string;
  createdAt: any;
  size: number;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [error, setError] = useState('');

  // Basic RBAC – admin email hard‑coded for demo
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/portal/login');
      } else if (user.email !== 'admin@btnaik.com') {
        setError('Access Denied. You do not have administrative privileges.');
        setLoadingDocs(false);
      } else if (!isFirebaseConfigured) {
        setError('Firebase not configured – cannot fetch documents.');
        setLoadingDocs(false);
      } else {
        fetchAllDocuments();
      }
    }
  }, [user, loading, router]);

  const fetchAllDocuments = async () => {
    try {
      const q = query(collection(db, 'documents'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const docsData: DocumentRecord[] = [];
      querySnapshot.forEach((doc) => {
        docsData.push({ id: doc.id, ...doc.data() } as DocumentRecord);
      });
      setDocuments(docsData);
    } catch (err: any) {
      console.error('Error fetching all documents:', err);
      setError('Failed to load documents. Ensure Firestore security rules allow admin access.');
    } finally {
      setLoadingDocs(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-navy-primary mx-auto" />
        <p className="text-xs text-text-muted mt-4">Loading admin dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 route-transition">
        <FaLock className="text-accent-warning text-4xl mb-4" />
        <h1 className="text-2xl font-serif font-semibold text-navy-ink mb-2">Access Restricted</h1>
        <p className="text-xs text-text-body">{error}</p>
        <p className="mt-6 text-xs text-text-muted bg-bg-secondary p-4 rounded-[3px] border border-border-gray">
          To view this page in the demo, login via Email using: <strong className="text-navy-ink">admin@btnaik.com</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary min-h-screen py-12 route-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-semibold text-navy-ink">Staff Admin Dashboard</h1>
            <p className="text-xs text-text-muted mt-1">View and download documents uploaded by all clients.</p>
          </div>
        </div>

        <div className="bg-white rounded-[3px] border border-border-gray overflow-hidden">
          <div className="px-6 py-4 border-b border-border-gray bg-bg-secondary flex justify-between items-center">
            <h2 className="text-lg font-serif font-semibold text-navy-ink">All Client Documents</h2>
            <span className="bg-navy-primary text-neon-pastel text-[10px] font-semibold px-2.5 py-1 rounded-[3px] num-ledger">
              {documents.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border-gray">
              <thead className="bg-bg-secondary">
                <tr>
                  <th scope="col" className="px-6 py-3.5 text-left text-[10px] font-semibold text-navy-ink uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-[10px] font-semibold text-navy-ink uppercase tracking-wider">Document</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-[10px] font-semibold text-navy-ink uppercase tracking-wider">Upload Date</th>
                  <th scope="col" className="px-6 py-3.5 text-left text-[10px] font-semibold text-navy-ink uppercase tracking-wider">Size</th>
                  <th scope="col" className="relative px-6 py-3.5"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border-gray">
                {loadingDocs ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-xs text-text-muted">Loading records...</td>
                  </tr>
                ) : documents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-xs text-text-muted">No documents found.</td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-bg-secondary transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs font-semibold text-navy-ink">{doc.userEmail}</div>
                        <div className="text-[10px] text-text-muted num-ledger mt-0.5">UID: {doc.userId.substring(0, 8)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaFileAlt className="text-text-muted mr-2 text-xs" />
                          <span className="text-xs text-text-body">{doc.filename}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-text-muted num-ledger">
                        {doc.createdAt ? new Date(doc.createdAt.toDate()).toLocaleString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-text-muted num-ledger">
                        {formatSize(doc.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy-primary hover:text-navy-ink inline-flex items-center font-semibold link-draw btn-press"
                        >
                          <FaDownload className="mr-1" /> Download
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
