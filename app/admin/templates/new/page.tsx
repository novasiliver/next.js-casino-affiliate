"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewTemplatePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    component: '',
    category: '',
    description: '',
    isActive: true,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent form submission if template was already created via upload
    if (uploadSuccess) {
      return;
    }
    
    setSaving(true);

    try {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/templates');
      } else {
        const data = await res.json().catch(() => ({ error: 'Failed to save template' }));
        // Don't show alert for duplicate template (409) - template already exists via upload
        if (res.status !== 409) {
          alert(data.error || 'Failed to save template');
        } else {
          // If template already exists, redirect to templates list
          router.push('/admin/templates');
        }
      }
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Error saving template');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/admin/templates" className="text-amber-400 hover:text-amber-300 text-sm mb-4 inline-block">
          ← Back to Templates
        </Link>
        <h1 className="text-3xl font-bold text-white">Create Template</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-white/5 rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Slug *</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            placeholder="template2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
          >
            <option value="">Select a category</option>
            <option value="Casino Review Page Template">Casino Review Page Template</option>
            <option value="Post Page Template">Post Page Template</option>
            <option value="Game Page Template">Game Page Template</option>
            <option value="Bonus Page Template">Bonus Page Template</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Component Name *</label>
          <input
            type="text"
            required
            value={formData.component}
            onChange={(e) => setFormData({ ...formData, component: e.target.value })}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
            placeholder="ReviewTemplate2"
          />
          <p className="text-xs text-slate-500 mt-1">The React component file name (without .tsx)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 resize-none"
          />
        </div>

        {/* Template Upload Section */}
        <div className="border-t border-white/5 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upload Template HTML (Optional)</h3>
          <p className="text-sm text-slate-400 mb-4">
            Upload an HTML file to automatically convert it to a React component. The template will be created and the component will be generated automatically.
          </p>
          <input
            type="file"
            accept=".html"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              // Require category and name
              if (!formData.category) {
                alert('Please select a category first');
                return;
              }

              if (!formData.name) {
                alert('Please enter a template name first');
                return;
              }

              setUploading(true);
              setUploadMessage('');
              
              try {
                const uploadFormData = new FormData();
                uploadFormData.append('file', file);
                
                // Auto-generate slug from filename if not provided
                const fileName = file.name.replace('.html', '');
                const autoSlug = formData.slug || fileName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const autoComponent = formData.component || fileName
                  .split(/[-_\s]+/)
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('');

                // Update form data with auto-generated values
                setFormData(prev => ({
                  ...prev,
                  slug: prev.slug || autoSlug,
                  component: prev.component || autoComponent,
                }));

                uploadFormData.append('name', formData.name);
                uploadFormData.append('slug', formData.slug || autoSlug);
                uploadFormData.append('component', formData.component || autoComponent);
                uploadFormData.append('category', formData.category);
                uploadFormData.append('description', formData.description || '');
                uploadFormData.append('isActive', formData.isActive.toString());

                const res = await fetch('/api/admin/templates/upload', {
                  method: 'POST',
                  credentials: 'include',
                  body: uploadFormData,
                });

                if (!res.ok) {
                  const errorData = await res.json().catch(() => ({ error: 'Failed to upload template' }));
                  setUploadMessage(`❌ ${errorData.error || 'Failed to upload template'}`);
                  return;
                }

                const data = await res.json();
                setUploadMessage(`✅ Template created and uploaded successfully! Component: ${data.component}`);
                setUploadSuccess(true); // Mark upload as successful to prevent form submission
                // Update form with the created template data
                setFormData(prev => ({ 
                  ...prev, 
                  slug: data.slug || prev.slug,
                  component: data.component || prev.component 
                }));
                // Redirect to edit page with the new ID after a short delay
                if (data.templateId) {
                  setTimeout(() => {
                    router.push(`/admin/templates/${data.templateId}/edit`);
                  }, 1500);
                }
              } catch (error) {
                console.error('Upload error:', error);
                setUploadMessage('❌ Failed to upload template');
              } finally {
                setUploading(false);
              }
            }}
            className="hidden"
            id="template-upload"
            disabled={uploading || !formData.category || !formData.name}
          />
          <label
            htmlFor="template-upload"
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              uploading || !formData.category || !formData.name
                ? 'border-slate-700 bg-slate-800/50 cursor-not-allowed'
                : 'border-white/10 bg-slate-900/50 hover:border-amber-500/50'
            }`}
          >
            {uploading ? (
              <>
                <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                <span className="text-xs text-slate-400">Creating template and converting...</span>
              </>
            ) : (!formData.category || !formData.name) ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-slate-500 mb-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
                <span className="text-xs text-slate-400">
                  {!formData.category ? 'Please select a category first' : 'Please enter a template name first'}
                </span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-slate-500 mb-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
                <span className="text-xs text-slate-400">Click to upload HTML and create template</span>
              </>
            )}
          </label>
          {uploadMessage && (
            <p className={`text-sm mt-2 ${uploadMessage.startsWith('✅') ? 'text-emerald-400' : 'text-rose-400'}`}>
              {uploadMessage}
            </p>
          )}
          <p className="text-xs text-slate-500 mt-2">
            Note: The HTML file should contain the template structure. Use <code className="bg-slate-800 px-1 py-0.5 rounded">{"{casino.property}"}</code> for dynamic data.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm text-slate-300">Active</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving || uploadSuccess || uploading}
            className="px-6 py-3 bg-amber-500 text-slate-950 font-semibold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : uploadSuccess ? 'Template Created' : 'Save Template'}
          </button>
          <Link
            href="/admin/templates"
            className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
