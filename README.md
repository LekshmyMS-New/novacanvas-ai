
# NovaCanvas AI

NovaCanvas is an AI-powered art generator built with React, Node.js, with latest AI tools. Users can type prompts, get enhanced descriptions, and generate stunning AI images in real-time.

## Features
- Real-time AI image generation with enhanced descriptions
- Multiple categories: Architecture, Fashion, Nature, Technology, Product Design
- Gallery of generated images
- Responsive and visually appealing UI with MUI + Framer Motion
- Saves images with prompt and timestamp using React Context

## Tech Stack
- Frontend: React, MUI, Framer Motion
- Backend: Node.js, Express
- AI: Open API for image generation
- State Management: React Context
- Deployment: Localhost / Ready for cloud deployment

  Architecture diagram

┌──────────────────────────────────────────────┐
│            React Frontend                     │
│   Prompt · Category · Gallery · Preview       │
└──────────────────┬───────────────────────────┘
                   │  POST /api/generate
                   ▼
┌─────────────────────────────────────────────┐
│            Express API Layer                 │
│   Validate prompt → Enhance → Route          │
└─────────┬─────────────────────┬─────────────┘
          │                     │
          ▼                     ▼
┌──────────────────┐   ┌──────────────────────┐
│  Image Gen Svc   │   │   Prompt Enhancer    │
│  OpenAI API call │   │   Category mapping   │
└────────┬─────────┘   └──────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────┐
│         React Context (Client State)          │
│   Gallery array · History · Active theme     │
│            + localStorage persistence         │
└──────────────────────────────────────────────┘
State Management with React Context

// GalleryContext.jsx
const GalleryContext = createContext();

export function GalleryProvider({ children }) {
  const [gallery, setGallery] = useState(() => {
    // Initialize from localStorage on first load
    const saved = localStorage.getItem('novacanvas_gallery');
    return saved ? JSON.parse(saved) : [];
  });

  const addImage = (imageUrl, prompt, category) => {
    const newEntry = {
      id: Date.now(),
      imageUrl,
      prompt,
      category,
      timestamp: new Date().toISOString()
    };
    setGallery(prev => {
      const updated = [newEntry, ...prev];
      localStorage.setItem('novacanvas_gallery', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <GalleryContext.Provider value={{ gallery, addImage }}>
      {children}
    </GalleryContext.Provider>
  );
}

DSA Added
NovaCanvas applies several core data structures and algorithms under the hood. The gallery uses a Stack (LIFO) pattern — new images are prepended so the most recent always appears first. A HashMap powers the category-to-style mapping, giving O(1) lookup when enhancing prompts. The gallery filter and search both run in O(n) linear time using Array.filter(). A Debounce timer (sliding window) prevents the filter from firing on every keystroke — it waits 400ms after the user stops typing. Gallery sorting uses JavaScript's built-in O(n log n) comparison sort on timestamps, while groupByCategory runs in O(n) using a reduce-based HashMap. Finally, an LRU Cache (backed by a JS Map for O(1) get/put) deduplicates identical prompt+category combinations within a session, avoiding redundant OpenAI API calls.

## Demo
Screen Recording: https://drive.google.com/file/d/1UaZEg14vlPIAXZ6wQQSoJl5ITihqV8I6/view?usp=drive_link

## Setup
1. Clone the repo
2. Run `npm install` in both frontend and backend
3. Add `.env` file with OPEN_API_KEY
4. Start backend: `node server.js`
5. Start frontend: `npm run dev` in frontend folder
