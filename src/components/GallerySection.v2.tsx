import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Image as ImageIcon,
  Sparkles,
  Heart,
  BookOpen,
  Calendar,
  X
} from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { travelStories, websiteContent } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<{ title: string; url: string; location: string } | null>(null);

  const galleryImages = [
    {
      title: "Gondola Phase 2 Snow Peaks",
      location: "Gulmarg, 13,780 ft",
      category: "Snow & Mountains",
      url: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Golden Hour Houseboats on Nigeen Lake",
      location: "Srinagar",
      category: "Lakes & Water",
      url: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Lidder River Pine Valley Trails",
      location: "Pahalgam",
      category: "Valleys & Pines",
      url: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Habba Khatoon Pyramid Peak",
      location: "Gurez Valley",
      category: "Offbeat & Hidden",
      url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Drung Frozen Ice Cascades",
      location: "Tangmarg Foothills",
      category: "Snow & Mountains",
      url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Milky Shaliganga Mountain Waters",
      location: "Doodhpathri, Budgam",
      category: "Valleys & Pines",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Saffron Purple Bloom Plateaus",
      location: "Pampore",
      category: "Culture & Heritage",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Carved Walnut Wood Heritage Craft",
      location: "Old Downtown Srinagar",
      category: "Culture & Heritage",
      url: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const categories = ['All', 'Snow & Mountains', 'Lakes & Water', 'Valleys & Pines', 'Offbeat & Hidden', 'Culture & Heritage'];

  const filteredImages = galleryImages.filter((img) => {
    if (selectedCategory === 'All') return true;
    return img.category === selectedCategory;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8faf9] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#0f4332] text-xs font-bold uppercase tracking-wider">
              <ImageIcon className="w-3.5 h-3.5 text-[#b88628]" />
              <span>THE VISUAL ARCHIVE OF KASHMIR</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f231b] tracking-tight">
              {websiteContent.gallerySectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              {websiteContent.gallerySectionDesc}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0f4332] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setActivePhoto(img)}
              className="relative h-72 rounded-3xl overflow-hidden border border-slate-200/90 group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#e5be73] font-bold block mb-0.5">
                  {img.location}
                </span>
                <h4 className="font-serif text-base font-bold leading-snug drop-shadow">
                  {img.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Stories Snippet */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#b88628] font-bold block">
                Traveler Journals
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0f231b]">
                Memoirs from the Mountains
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {travelStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden flex flex-col sm:flex-row hover:border-[#b88628]/50 hover:shadow-xl hover:-translate-y-1 transition-all shadow-xs"
              >
                <div className="sm:w-2/5 relative h-56 sm:h-auto">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-sm text-[10px] text-white font-medium">
                    {story.season}
                  </div>
                </div>
                <div className="p-6 sm:w-3/5 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-900 leading-snug mb-1">
                      {story.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2 font-medium">By {story.author} • {story.duration}</p>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{story.excerpt}"
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs text-[#b88628] font-semibold border-t border-slate-100">
                    <span className="flex items-center gap-1 font-bold">
                      <Heart className="w-3.5 h-3.5 fill-[#b88628]" />
                      {story.likes} Travelers Inspired
                    </span>
                    <span className="underline cursor-pointer hover:text-[#0f4332]">Read Full Journal</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden">
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 bg-white flex items-center justify-between text-slate-900 border-t border-slate-100">
              <div>
                <h4 className="font-serif text-xl font-bold text-slate-900">{activePhoto.title}</h4>
                <p className="text-xs text-[#b88628] font-semibold">{activePhoto.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
