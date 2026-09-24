import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Plus, 
  Trash2, 
  Building2, 
  Tag, 
  Check, 
  X,
  AlertCircle
} from 'lucide-react';
import { Business, Category } from '../../types';

interface AdminTaxonomyTabProps {
  categories: Category[];
  localities: string[];
  businesses: Business[];
  onAddNewCategory: (cat: Category) => void;
  onDeleteCategory: (catName: string) => void;
  onAddNewSubcategory: (catName: string, sub: string) => void;
  onDeleteSubcategory: (catName: string, sub: string) => void;
  onAddNewLocality: (loc: string) => void;
  onDeleteLocality: (loc: string) => void;
  showToast: (msg: string) => void;
}

export const AdminTaxonomyTab: React.FC<AdminTaxonomyTabProps> = ({
  categories,
  localities,
  businesses,
  onAddNewCategory,
  onDeleteCategory,
  onAddNewSubcategory,
  onDeleteSubcategory,
  onAddNewLocality,
  onDeleteLocality,
  showToast,
}) => {
  // New Category Form
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatColor, setNewCatColor] = useState('#e11d48');
  const [newCatSubs, setNewCatSubs] = useState('');

  // Subcategory Quick Add
  const [targetCatForSub, setTargetCatForSub] = useState(categories[0]?.name || '');
  const [newSubInput, setNewSubInput] = useState('');

  // Locality Quick Add
  const [newLocInput, setNewLocInput] = useState('');

  // Delete confirmations
  const [catToDelete, setCatToDelete] = useState<string | null>(null);
  const [locToDelete, setLocToDelete] = useState<string | null>(null);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      showToast('Please enter a category name');
      return;
    }

    const exists = categories.some((c) => c.name.toLowerCase() === newCatName.trim().toLowerCase());
    if (exists) {
      showToast('A category with this name already exists');
      return;
    }

    const subList = newCatSubs
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      description: newCatDesc.trim() || `${newCatName.trim()} directory in Yercaud`,
      color: newCatColor,
      count: 0,
      iconName: 'Building2',
      subcategories: subList.length > 0 ? subList : ['General Services', 'Popular Options'],
    };

    onAddNewCategory(newCategory);
    showToast(`Created category "${newCatName}"!`);
    setNewCatName('');
    setNewCatDesc('');
    setNewCatSubs('');
  };

  const handleAddSubcategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCatForSub || !newSubInput.trim()) return;

    onAddNewSubcategory(targetCatForSub, newSubInput.trim());
    showToast(`Added "${newSubInput.trim()}" to ${targetCatForSub}`);
    setNewSubInput('');
  };

  const handleAddLocality = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocInput.trim()) return;

    const exists = localities.some((l) => l.toLowerCase() === newLocInput.trim().toLowerCase());
    if (exists) {
      showToast('This locality is already added');
      return;
    }

    onAddNewLocality(newLocInput.trim());
    showToast(`Added locality "${newLocInput.trim()}"`);
    setNewLocInput('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Categories & Subcategories */}
        <div className="lg:col-span-7 space-y-6">
          {/* Add Category Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Create New Category
                </h3>
                <p className="text-xs text-slate-500">Add a new business segment to 123yercaud directory</p>
              </div>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-bold mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Spas &amp; Ayurvedic Centers"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Badge Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newCatColor}
                      onChange={(e) => setNewCatColor(e.target.value)}
                      className="w-10 h-8 rounded-lg cursor-pointer bg-white border border-slate-200"
                    />
                    <span className="font-mono text-slate-700 font-medium">{newCatColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <input
                  type="text"
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Short summary for tourist portal search..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Initial Subcategories (Comma separated)</label>
                <input
                  type="text"
                  value={newCatSubs}
                  onChange={(e) => setNewCatSubs(e.target.value)}
                  placeholder="e.g. Herbal Massage, Steam Bath, Wellness Packages"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Category</span>
              </button>
            </form>
          </div>

          {/* Quick Add Subcategory Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Add Subcategory to Existing Category
            </h4>
            <form onSubmit={handleAddSubcategory} className="flex flex-col sm:flex-row gap-2 text-xs">
              <select
                value={targetCatForSub}
                onChange={(e) => setTargetCatForSub(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                required
                value={newSubInput}
                onChange={(e) => setNewSubInput(e.target.value)}
                placeholder="New subcategory name..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
              />

              <button
                type="submit"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-600" />
                <span>Add Sub</span>
              </button>
            </form>
          </div>

          {/* Existing Categories Directory List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Directory Categories ({categories.length})
              </h4>
              <span className="text-xs text-slate-500 font-medium">{businesses.length} total listings indexed</span>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {categories.map((cat) => {
                const count = businesses.filter((b) => b.category.toLowerCase() === cat.name.toLowerCase()).length;

                return (
                  <div
                    key={cat.id}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: cat.color || '#e11d48' }}
                        />
                        <span className="font-bold text-sm text-slate-900">{cat.name}</span>
                        <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 font-mono text-[10px] font-bold rounded">
                          {count} listings
                        </span>
                      </div>

                      <button
                        onClick={() => setCatToDelete(cat.name)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600">{cat.description}</p>

                    {/* Subcategories tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase mr-1">Subcategories:</span>
                      {cat.subcategories && cat.subcategories.length > 0 ? (
                        cat.subcategories.map((sub) => (
                          <span
                            key={sub}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-[11px] rounded-md font-medium group"
                          >
                            <span>{sub}</span>
                            <button
                              onClick={() => {
                                onDeleteSubcategory(cat.name, sub);
                                showToast(`Removed "${sub}" from ${cat.name}`);
                              }}
                              className="text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer"
                              title="Delete subcategory"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">No subcategories defined</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Localities Manager */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Yercaud Localities
                </h3>
                <p className="text-xs text-slate-500">Manage recognized town centers and tourist hubs</p>
              </div>
            </div>

            {/* Add Locality Form */}
            <form onSubmit={handleAddLocality} className="space-y-2 text-xs">
              <label className="block text-slate-700 font-bold">Add New Locality</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newLocInput}
                  onChange={(e) => setNewLocInput(e.target.value)}
                  placeholder="e.g. Tipperary Road, Yercaud"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:border-red-600 font-medium"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </form>

            {/* Localities List */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-1 font-medium">
                <span>Active Localities ({localities.filter((l) => l !== 'All Localities').length})</span>
                <span>Listings count</span>
              </div>

              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                {localities
                  .filter((l) => l !== 'All Localities')
                  .map((loc) => {
                    const count = businesses.filter((b) => b.locality === loc).length;

                    return (
                      <div
                        key={loc}
                        className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span className="font-semibold text-slate-800">{loc}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 font-mono text-[10px] font-bold rounded">
                            {count}
                          </span>
                          <button
                            onClick={() => setLocToDelete(loc)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                            title="Delete locality"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Category Confirm Modal */}
      {catToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Delete Category?</h3>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete category <strong className="text-slate-900">"{catToDelete}"</strong>?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCatToDelete(null)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteCategory(catToDelete);
                  showToast(`Category "${catToDelete}" deleted`);
                  setCatToDelete(null);
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Locality Confirm Modal */}
      {locToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-900">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Delete Locality?</h3>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete locality <strong className="text-slate-900">"{locToDelete}"</strong>?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setLocToDelete(null)}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteLocality(locToDelete);
                  showToast(`Locality "${locToDelete}" removed`);
                  setLocToDelete(null);
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
