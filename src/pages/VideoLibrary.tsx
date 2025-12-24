import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Search, Play, Filter, X } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  titleHi: string;
  titleKn: string;
  description: string;
  descriptionHi: string;
  descriptionKn: string;
  category: string;
  thumbnail: string;
  youtubeUrl: string;
  duration: string;
}

const VideoLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = [
    { id: 'all', label: t.allVideos },
    { id: 'menstrualHealth', label: t.menstrualHealth },
    { id: 'pregnancy', label: t.pregnancy },
    { id: 'contraception', label: t.contraception },
    { id: 'generalHealth', label: t.generalHealth },
  ];

  // Sample video data - you can replace these with your own YouTube URLs
  const videos: Video[] = [
    {
      id: '1',
      title: 'Understanding Your Menstrual Cycle',
      titleHi: 'अपने माहवारी चक्र को समझना',
      titleKn: 'ನಿಮ್ಮ ಮುಟ್ಟಿನ ಚಕ್ರವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು',
      description: 'Learn about the different phases of your menstrual cycle and what to expect.',
      descriptionHi: 'अपने माहवारी चक्र के विभिन्न चरणों और क्या उम्मीद करें इसके बारे में जानें।',
      descriptionKn: 'ನಿಮ್ಮ ಮುಟ್ಟಿನ ಚಕ್ರದ ವಿವಿಧ ಹಂತಗಳು ಮತ್ತು ಏನನ್ನು ನಿರೀಕ್ಷಿಸಬೇಕು ಎಂಬುದರ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.',
      category: 'menstrualHealth',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80',
      youtubeUrl: 'https://www.youtube.com/embed/WOi2Bwvp6hw',
      duration: '8:45',
    },
    {
      id: '2',
      title: 'Managing Period Pain Naturally',
      titleHi: 'माहवारी के दर्द को प्राकृतिक रूप से प्रबंधित करना',
      titleKn: 'ಮುಟ್ಟಿನ ನೋವನ್ನು ಸ್ವಾಭಾವಿಕವಾಗಿ ನಿರ್ವಹಿಸುವುದು',
      description: 'Natural remedies and exercises to help manage menstrual cramps.',
      descriptionHi: 'माहवारी में ऐंठन को प्रबंधित करने में मदद के लिए प्राकृतिक उपचार और व्यायाम।',
      descriptionKn: 'ಮುಟ್ಟಿನ ಸೆಳೆತವನ್ನು ನಿರ್ವಹಿಸಲು ಸಹಾಯ ಮಾಡುವ ನೈಸರ್ಗಿಕ ಪರಿಹಾರಗಳು ಮತ್ತು ವ್ಯಾಯಾಮಗಳು.',
      category: 'menstrualHealth',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
      youtubeUrl: 'https://www.youtube.com/embed/aXItOY0sLRY',
      duration: '6:30',
    },
    {
      id: '3',
      title: 'Early Signs of Pregnancy',
      titleHi: 'गर्भावस्था के शुरुआती संकेत',
      titleKn: 'ಗರ್ಭಧಾರಣೆಯ ಆರಂಭಿಕ ಲಕ್ಷಣಗಳು',
      description: 'Common early pregnancy symptoms and when to take a test.',
      descriptionHi: 'सामान्य शुरुआती गर्भावस्था के लक्षण और कब टेस्ट करें।',
      descriptionKn: 'ಸಾಮಾನ್ಯ ಆರಂಭಿಕ ಗರ್ಭಧಾರಣೆ ಲಕ್ಷಣಗಳು ಮತ್ತು ಪರೀಕ್ಷೆ ಯಾವಾಗ ಮಾಡಬೇಕು.',
      category: 'pregnancy',
      thumbnail: 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=400&q=80',
      youtubeUrl: 'https://www.youtube.com/embed/BHY0FxzoKZE',
      duration: '10:15',
    },
    {
      id: '4',
      title: 'Prenatal Care Essentials',
      titleHi: 'प्रसव पूर्व देखभाल की आवश्यकताएं',
      titleKn: 'ಪ್ರಸವಪೂರ್ವ ಆರೈಕೆ ಅಗತ್ಯತೆಗಳು',
      description: 'Important steps to take care of yourself during pregnancy.',
      descriptionHi: 'गर्भावस्था के दौरान अपना ख्याल रखने के महत्वपूर्ण कदम।',
      descriptionKn: 'ಗರ್ಭಧಾರಣೆ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮನ್ನು ನೋಡಿಕೊಳ್ಳಲು ಮುಖ್ಯ ಹಂತಗಳು.',
      category: 'pregnancy',
      thumbnail: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80',
      youtubeUrl: 'https://www.youtube.com/embed/j7YucfJuziU',
      duration: '12:20',
    },
    {
      id: '5',
      title: 'Family Planning Methods',
      titleHi: 'परिवार नियोजन के तरीके',
      titleKn: 'ಕುಟುಂಬ ಯೋಜನಾ ವಿಧಾನಗಳು',
      description: 'Overview of different contraception options available.',
      descriptionHi: 'उपलब्ध विभिन्न गर्भनिरोधक विकल्पों का अवलोकन।',
      descriptionKn: 'ಲಭ್ಯವಿರುವ ವಿಭಿನ್ನ ಗರ್ಭನಿರೋಧಕ ಆಯ್ಕೆಗಳ ಸಾರಾಂಶ.',
      category: 'contraception',
      thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80',
      youtubeUrl: 'https://www.youtube.com/embed/8sgycukafqQ',
      duration: '9:00',
    },
    {
      id: '6',
      title: 'Breast Self-Examination',
      titleHi: 'स्तन स्व-परीक्षण',
      titleKn: 'ಸ್ತನ ಸ್ವಯಂ ಪರೀಕ್ಷೆ',
      description: 'Step-by-step guide to perform a breast self-exam at home.',
      descriptionHi: 'घर पर स्तन स्व-परीक्षण करने के लिए चरण-दर-चरण मार्गदर्शिका।',
      descriptionKn: 'ಮನೆಯಲ್ಲಿ ಸ್ತನ ಸ್ವಯಂ ಪರೀಕ್ಷೆ ಮಾಡಲು ಹಂತ-ಹಂತವಾಗಿ ಮಾರ್ಗದರ್ಶಿ.',
      category: 'generalHealth',
      thumbnail: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80',
      youtubeUrl: 'https://www.youtube.com/embed/Ec-2UL8mwQI',
      duration: '5:45',
    },
    {
      id: '7',
      title: 'Nutrition During Menstruation',
      titleHi: 'माहवारी के दौरान पोषण',
      titleKn: 'ಮುಟ್ಟಿನ ಸಮಯದಲ್ಲಿ ಪೌಷ್ಟಿಕಾಂಶ',
      description: 'Foods that help during your menstrual cycle.',
      descriptionHi: 'ऐसे खाद्य पदार्थ जो माहवारी चक्र के दौरान मदद करते हैं।',
      descriptionKn: 'ಮುಟ್ಟಿನ ಚಕ್ರದಲ್ಲಿ ಸಹಾಯ ಮಾಡುವ ಆಹಾರಗಳು.',
      category: 'menstrualHealth',
      thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80',
      youtubeUrl: 'https://www.youtube.com/embed/SxhsR_dG7sw',
      duration: '7:30',
    },
    {
      id: '8',
      title: 'Safe Exercises During Pregnancy',
      titleHi: 'गर्भावस्था के दौरान सुरक्षित व्यायाम',
      titleKn: 'ಗರ್ಭಧಾರಣೆ ಸಮಯದಲ್ಲಿ ಸುರಕ್ಷಿತ ವ್ಯಾಯಾಮಗಳು',
      description: 'Gentle exercises that are safe for pregnant women.',
      descriptionHi: 'हल्के व्यायाम जो गर्भवती महिलाओं के लिए सुरक्षित हैं।',
      descriptionKn: 'ಗರ್ಭಿಣಿ ಮಹಿಳೆಯರಿಗೆ ಸುರಕ್ಷಿತವಾದ ಮೃದು ವ್ಯಾಯಾಮಗಳು.',
      category: 'pregnancy',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80',
      youtubeUrl: 'https://www.youtube.com/embed/OQ9xyDaxwzM',
      duration: '11:00',
    },
  ];

  const getLocalizedTitle = (video: Video) => {
    switch (language) {
      case 'hi': return video.titleHi;
      case 'kn': return video.titleKn;
      default: return video.title;
    }
  };

  const getLocalizedDescription = (video: Video) => {
    switch (language) {
      case 'hi': return video.descriptionHi;
      case 'kn': return video.descriptionKn;
      default: return video.description;
    }
  };

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const title = getLocalizedTitle(video).toLowerCase();
    const matchesSearch = title.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-soft">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 hover:bg-primary-foreground/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{t.videoLibrary}</h1>
        </div>
      </header>

      {/* Search bar */}
      <div className="p-4 border-b border-border bg-background sticky top-[68px] z-10">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchVideos}
            className="w-full pl-12 pr-4 py-4 bg-secondary rounded-2xl text-lg 
                     border-2 border-transparent focus:border-primary 
                     focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="p-4 overflow-x-auto">
        <div className="max-w-2xl mx-auto flex gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-3 rounded-full text-base font-medium whitespace-nowrap 
                       transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Video grid */}
      <main className="p-4 max-w-2xl mx-auto">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground text-lg">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="video-card text-left animate-scale-in"
              >
                <div className="relative aspect-video bg-muted">
                  <img
                    src={video.thumbnail}
                    alt={getLocalizedTitle(video)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center 
                                opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="w-16 h-16 text-primary-foreground" fill="currentColor" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-foreground/80 
                                 text-primary-foreground text-sm rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                    {getLocalizedTitle(video)}
                  </h3>
                  <p className="text-muted-foreground text-base line-clamp-2">
                    {getLocalizedDescription(video)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Video player modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-foreground/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">
                {getLocalizedTitle(selectedVideo)}
              </h2>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={selectedVideo.youtubeUrl}
                title={getLocalizedTitle(selectedVideo)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-lg">
                {getLocalizedDescription(selectedVideo)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;
