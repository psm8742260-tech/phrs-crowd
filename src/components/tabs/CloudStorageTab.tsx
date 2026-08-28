import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

export default function CloudStorageTab({ state }: { state: any }) {
  const { newBucketName, setNewBucketName, uploadTargetBucket, setUploadTargetBucket, isUploading, setIsUploading, setHomeToast } = state;
  const { Database, Trash2 } = LucideIcons;

  const [realBuckets, setRealBuckets] = useState<any[]>([]);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const fetchBuckets = async () => {
    try {
      const res = await fetch('/api/storage/buckets');
      const data = await res.json();
      if (data.success) {
        setRealBuckets(data.buckets);
        if (data.buckets.length > 0 && !uploadTargetBucket) {
          setUploadTargetBucket(data.buckets[0].name);
        }
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchBuckets();
  }, []);

  return (
        <>
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border bg-white border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold tracking-tight">Cloud Storage Buckets</h2>
              </div>
              <p className="text-xs text-slate-500 max-w-2xl">
                Store binary assets, static webpage layouts, and raw analytical .sqlite database backups in regionally distributed static buckets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4">CREATE NEW BUCKET</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">UNIQUE BUCKET NAME</label>
                    <input 
                      type="text" 
                      placeholder="e.g. static-phrs-assets"
                      value={newBucketName} 
                      onChange={(e) => setNewBucketName(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono bg-slate-100 border-slate-300 text-slate-900"
                    />
                  </div>

                  <button 
                    onClick={async () => {
                      if (!newBucketName.trim()) {
                        alert('Enter bucket name!');
                        return;
                      }
                      const folderName = newBucketName.toLowerCase().replace(/\s+/g, '-');
                      try {
                        const res = await fetch('/api/storage/buckets', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ name: folderName })
                        });
                        const data = await res.json();
                        if (data.success) {
                          setHomeToast(`✓ Created storage bucket: ${folderName}`);
                          setNewBucketName('');
                          fetchBuckets();
                        }
                      } catch(e) { console.error(e); }
                      setTimeout(() => setHomeToast(null), 3000);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs py-2 rounded-lg font-semibold transition"
                  >
                    CREATE BUCKET
                  </button>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-6">
                  <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-3">UPLOAD FILE TO BUCKET</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">SELECT FILE</label>
                      <input 
                        type="file" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFileToUpload(e.target.files[0]);
                          }
                        }}
                        className="w-full p-2 text-xs rounded-lg border font-mono bg-slate-100 border-slate-300 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-500 mb-1">TARGET STORAGE BUCKET</label>
                      <select 
                        value={uploadTargetBucket} 
                        onChange={(e) => setUploadTargetBucket(e.target.value)}
                        className="w-full p-2 text-xs rounded-lg border cursor-pointer bg-slate-100 border-slate-300 text-slate-900"
                      >
                        {realBuckets.map((b, idx) => (
                          <option key={idx} value={b.name}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      onClick={async () => {
                        if (!fileToUpload || !uploadTargetBucket) {
                          alert('Select a file and target bucket!');
                          return;
                        }
                        setIsUploading(true);
                        const formData = new FormData();
                        formData.append('file', fileToUpload);
                        formData.append('bucket', uploadTargetBucket);
                        
                        try {
                          const res = await fetch('/api/storage/upload', {
                            method: 'POST',
                            body: formData
                          });
                          const data = await res.json();
                          if (data.success) {
                            setHomeToast(`✓ Uploaded "${data.fileName}" to bucket ${uploadTargetBucket}`);
                            setFileToUpload(null);
                            fetchBuckets();
                          }
                        } catch(e) { console.error(e); }
                        setIsUploading(false);
                        setTimeout(() => setHomeToast(null), 3000);
                      }}
                      disabled={isUploading}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-mono text-xs py-2 rounded-lg font-semibold transition"
                    >
                      {isUploading ? 'UPLOADING...' : 'UPLOAD TO BUCKET'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 p-5 rounded-2xl border border-slate-200 bg-white">
                <h3 className="font-mono font-bold text-xs tracking-wider text-indigo-500 uppercase mb-4 font-semibold">STORAGE INVENTORY BUCKETS</h3>
                <div className="space-y-4 font-mono text-xs">
                  {realBuckets.length === 0 && <p className="text-slate-400 italic">No storage buckets found.</p>}
                  {realBuckets.map((bucket, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-800">{bucket.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold rounded">
                            {bucket.region || bucket.location}
                          </span>
                          <button 
                            onClick={async () => {
                              if(confirm(`Delete bucket ${bucket.name}?`)) {
                                await fetch(`/api/storage/buckets/${bucket.name}`, { method: 'DELETE' });
                                fetchBuckets();
                              }
                            }}
                            className="text-rose-400 hover:text-rose-600 p-1 rounded transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-400">Total Size: {bucket.size} | Objects: {bucket.objects}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
  );
}
