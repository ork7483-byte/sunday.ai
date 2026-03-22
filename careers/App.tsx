import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types & Data ---

type Role = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
};

const SAMPLE_ROLES: Role[] = [
  // Robotics
  { id: 'r1', title: 'Robotics Controls Engineer', category: 'Robotics', location: 'Mountain View', description: 'Design and implement advanced control algorithms for dynamic robots.' },
  { id: 'r2', title: 'SLAM Engineer', category: 'Robotics', location: 'Mountain View', description: 'Develop robust simultaneous localization and mapping systems for unstructured environments.' },
  { id: 'r3', title: 'Full Stack Robotics Software Engineer', category: 'Robotics', location: 'Mountain View', description: 'Bridge the gap between high-level cloud services and low-level robot operations.' },
  { id: 'r4', title: 'Robotics Systems Engineer', category: 'Robotics', location: 'Mountain View', description: 'Oversee the integration of hardware and software subsystems.' },
  { id: 'r5', title: 'Robotics Motion Planning Engineer', category: 'Robotics', location: 'Mountain View', description: 'Create safe and efficient trajectories for complex robotic manipulators.' },
  { id: 'r6', title: 'Robotics Perception Engineer', category: 'Robotics', location: 'Mountain View', description: 'Apply computer vision and sensor fusion to help robots understand their world.' },

  // Hardware
  { id: 'h1', title: 'Mechanical Engineer', category: 'Hardware', location: 'Mountain View', description: 'Design mechanisms and structures for next-generation robots.' },
  { id: 'h2', title: 'Senior Electrical Engineer', category: 'Hardware', location: 'Mountain View', description: 'Lead the electrical architecture design from concept to production.' },
  { id: 'h3', title: 'Senior Mechanical Engineer', category: 'Hardware', location: 'Mountain View', description: 'Drive mechanical design excellence and mentor junior engineers.' },
  { id: 'h4', title: 'Senior Reliability and Test Engineer', category: 'Hardware', location: 'Mountain View', description: 'Ensure our robots can withstand the rigors of the real world.' },

  // Software
  { id: 's1', title: 'Software Engineer - Full Stack', category: 'Software', location: 'Mountain View', description: 'Build intuitive user interfaces and scalable backend services.' },
  { id: 's2', title: 'Software Engineer - Systems', category: 'Software', location: 'Mountain View', description: 'Optimize operating system performance and resource management.' },
  { id: 's3', title: 'Software Engineer - Unity', category: 'Software', location: 'Mountain View', description: 'Develop simulation environments for training and validation.' },
  { id: 's4', title: 'Firmware Engineer', category: 'Software', location: 'Mountain View', description: 'Write low-level code for embedded microcontrollers.' },

  // Machine Learning
  { id: 'm1', title: 'Machine Learning Research Engineer/Scientist', category: 'Machine Learning', location: 'Mountain View', description: 'Push the boundaries of what is possible with learning-based approaches.' },
  { id: 'm2', title: 'ML Infrastructure Engineer', category: 'Machine Learning', location: 'Mountain View', description: 'Build the pipeline and tools to train massive models efficiently.' },

  // Data Operations
  { id: 'd1', title: 'Memory Developer', category: 'Data Operations', location: 'Remote', description: 'Curate and manage large-scale datasets for training AI models.' },

  // Manufacturing
  { id: 'ma1', title: 'Assembly Associate', category: 'Manufacturing', location: 'Mountain View', description: 'Assemble complex electromechanical assemblies with precision.' },
  { id: 'ma2', title: 'Production Support Associate', category: 'Manufacturing', location: 'Mountain View', description: 'Support the production line with material handling and troubleshooting.' },

  // Marketing
  { id: 'mk1', title: 'Senior Social Media Manager', category: 'Marketing', location: 'Mountain View', description: 'Tell the story of our technology to a global audience.' },
  { id: 'mk2', title: 'Creative Director', category: 'Marketing', location: 'Mountain View', description: 'Define and maintain the visual identity of the brand.' },
  { id: 'mk3', title: 'Video Producer', category: 'Marketing', location: 'Mountain View', description: 'Create compelling video content showcasing our products.' },
  { id: 'mk4', title: 'Community Lead', category: 'Marketing', location: 'Mountain View', description: 'Engage with our community of users and enthusiasts.' },

  // Product
  { id: 'p1', title: 'Senior Industrial Designer', category: 'Product', location: 'Mountain View', description: 'Shape the physical form and user interaction of our robots.' },
];

const CATEGORIES = ['All', 'Robotics', 'Hardware', 'Software', 'Machine Learning', 'Data Operations', 'Manufacturing', 'Marketing', 'Product'];

// --- Icons ---

const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  ),
  Pause: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
  ),
  Volume2: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>
  ),
  VolumeX: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <line x1="23" y1="9" x2="17" y2="15"></line>
      <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
};

// --- Components ---

const VideoHero = ({ 
  src, 
  label, 
  headline,
  className = "" 
}: { 
  src: string; 
  label: string; 
  headline: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`relative w-full max-w-[1200px] mx-auto overflow-hidden rounded-2xl bg-[#E5E5E5] aspect-video md:aspect-[16/9] lg:aspect-[2/1] ${className}`}>
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://picsum.photos/1200/675" // Fallback poster
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-8 md:p-12">
        <div className="text-white max-w-2xl">
          <span className="inline-block mb-2 text-sm md:text-base font-medium uppercase tracking-wide opacity-90">{label}</span>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">{headline}</h1>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex gap-3 z-10">
        <button 
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <Icons.VolumeX /> : <Icons.Volume2 />}
        </button>
        <button 
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Icons.Pause /> : <Icons.Play />}
        </button>
      </div>
    </div>
  );
};

const TextBlock = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-20 md:py-32">
      <div className="max-w-4xl">
        <p className="text-2xl md:text-4xl font-normal leading-relaxed text-primary">
          “The future of helpful homes is being shaped by a team that’s turning academic breakthroughs into real products. We’re looking for optimistic experts and pragmatic pioneers ready to tackle the hardest problems in robotics — and ship solutions that actually help people.”
        </p>
      </div>
    </section>
  );
};

const RoleDrawer = ({ 
  role, 
  onClose 
}: { 
  role: Role | null; 
  onClose: () => void;
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (role) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [role]);

  // Handle outside click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!role) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        ref={drawerRef}
        className="w-full max-w-lg bg-[#F6F1E8] h-full shadow-2xl p-8 md:p-12 overflow-y-auto transform transition-transform duration-300 animate-slide-in"
      >
        <div className="flex justify-between items-start mb-12">
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">{role.category}</span>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-secondary hover:text-primary transition-colors rounded-full hover:bg-black/5"
            aria-label="Close details"
          >
            <Icons.X />
          </button>
        </div>

        <h2 className="text-3xl font-bold text-primary mb-4 leading-tight">{role.title}</h2>
        <p className="text-lg text-secondary mb-8">{role.location}</p>

        <div className="border-t border-black/10 pt-8 mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-primary">Role Description</h3>
          <p className="text-lg leading-relaxed text-secondary">
            {role.description}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-secondary">
            This is a placeholder description. In a real application, this would contain detailed responsibilities, qualifications, and team information pulled from an API.
          </p>
        </div>

        <button className="w-full bg-primary text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 group">
          Apply for this job
          <span className="group-hover:translate-x-1 transition-transform">
            <Icons.ArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

const RoleRow: React.FC<{ role: Role; onClick: () => void }> = ({ role, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-black/10 cursor-pointer hover:border-black/30 transition-colors"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="mb-2 md:mb-0">
        <h3 className="text-lg font-bold text-primary group-hover:text-black transition-colors">{role.title}</h3>
        <span className="text-sm text-secondary mt-1 block md:hidden">{role.category}</span>
      </div>
      <div className="text-secondary text-sm md:text-base font-light group-hover:text-primary transition-colors">
        {role.location}
      </div>
    </div>
  );
};

const FiltersColumn = ({ 
  activeCategory, 
  setActiveCategory, 
  counts 
}: { 
  activeCategory: string; 
  setActiveCategory: (cat: string) => void;
  counts: Record<string, number>;
}) => {
  return (
    <div className="md:sticky md:top-8 h-fit space-y-2">
      <h2 className="text-sm font-bold uppercase tracking-wider mb-6 text-primary flex items-center gap-2">
        Filters
        <span className="bg-black/5 text-primary px-2 py-0.5 rounded-full text-xs font-normal">
          {counts['All']}
        </span>
      </h2>
      
      <div className="flex flex-wrap md:flex-col gap-2 md:gap-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-left px-3 py-2 md:px-0 md:py-1.5 text-sm md:text-base transition-colors rounded-full md:rounded-none flex items-center justify-between group w-full ${
              activeCategory === cat 
                ? 'bg-primary text-white md:bg-transparent md:text-primary md:font-bold' 
                : 'bg-white md:bg-transparent text-secondary hover:text-primary'
            }`}
            aria-pressed={activeCategory === cat}
          >
            <span>{cat}</span>
            {activeCategory === cat && (
              <span className="hidden md:block text-primary">
                <Icons.ArrowRight />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const CareersSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Filter Logic
  const filteredRoles = useMemo(() => {
    let roles = SAMPLE_ROLES;

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      roles = roles.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.category.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (activeCategory !== 'All') {
      roles = roles.filter(r => r.category === activeCategory);
    }

    return roles;
  }, [activeCategory, searchQuery]);

  // Group roles for display
  const groupedRoles = useMemo<Record<string, Role[]>>(() => {
    if (activeCategory !== 'All') {
      return { [activeCategory]: filteredRoles };
    }
    
    // Group by category, but respect the order of CATEGORIES array (skipping 'All')
    const groups: Record<string, Role[]> = {};
    CATEGORIES.slice(1).forEach(cat => {
      const rolesInCat = filteredRoles.filter(r => r.category === cat);
      if (rolesInCat.length > 0) {
        groups[cat] = rolesInCat;
      }
    });
    return groups;
  }, [activeCategory, filteredRoles]);

  // Counts for the filter sidebar (always based on full list + search, ignoring category selection itself)
  const counts = useMemo(() => {
    const searchFiltered = SAMPLE_ROLES.filter(r => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return r.title.toLowerCase().includes(q) || 
             r.category.toLowerCase().includes(q) ||
             r.location.toLowerCase().includes(q);
    });

    const c: Record<string, number> = { 'All': searchFiltered.length };
    CATEGORIES.slice(1).forEach(cat => {
      c[cat] = searchFiltered.filter(r => r.category === cat).length;
    });
    return c;
  }, [searchQuery]);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 relative">
        
        {/* Left Column: Sticky Filters */}
        <FiltersColumn 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          counts={counts}
        />

        {/* Right Column: Roles List */}
        <div>
          {/* Search Bar */}
          <div className="mb-12 sticky top-0 bg-[#F6F1E8] pt-4 pb-4 z-20 border-b border-transparent focus-within:border-black/10 transition-colors">
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-secondary">
                <Icons.Search />
              </div>
              <input 
                type="text" 
                placeholder="Search roles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-8 pr-4 py-2 text-xl md:text-2xl text-primary placeholder:text-black/20 focus:outline-none"
              />
            </div>
            <div className="mt-2 text-sm text-secondary">
              Showing {filteredRoles.length} roles
            </div>
          </div>

          {/* Roles List */}
          <div className="space-y-16 min-h-[400px]">
            {Object.keys(groupedRoles).length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-xl text-secondary mb-2">No roles found.</p>
                <p className="text-secondary/60">Try a different keyword or category.</p>
              </div>
            ) : (
              (Object.entries(groupedRoles) as [string, Role[]][]).map(([category, roles]) => (
                <div key={category} className="relative">
                  {/* Category Header - Sticky within its group context logic handled by native sticky */}
                  <div className="sticky top-[100px] bg-[#F6F1E8] py-4 z-10 border-b border-black/5 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-secondary">
                      {category}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    {roles.map(role => (
                      <RoleRow 
                        key={role.id} 
                        role={role} 
                        onClick={() => setSelectedRole(role)} 
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <RoleDrawer 
        role={selectedRole} 
        onClose={() => setSelectedRole(null)} 
      />
    </section>
  );
};

// --- Main App ---

const App = () => {
  return (
    <main className="w-full min-h-screen">
      {/* Spacer for top */}
      <div className="h-6 md:h-12"></div>

      <VideoHero 
        src="https://videos.pexels.com/video-files/5473806/5473806-uhd_2560_1440_25fps.mp4" 
        label="Careers at Sunday"
        headline="Shape the future of AI robotics"
        className="mb-8"
      />

      <TextBlock />

      <CareersSection />

      <VideoHero 
        src="https://videos.pexels.com/video-files/8555655/8555655-uhd_2560_1440_25fps.mp4" 
        label="Inside the lab"
        headline="See what we build"
        className="mb-24"
      />

      <footer className="max-w-[1200px] mx-auto px-6 pb-12 text-center md:text-left">
        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-secondary/60">
          <p>© 2024 Sunday Robotics Inc.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="#" className="hover:text-primary">LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

export default App;