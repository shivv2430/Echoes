# Echoes — A Private Memory Keeper

> *“Memories belong to the people who create them, not to a cloud service.”*

Created for the four-week developer challenge themed **“Ghost in the Machine.”**

🌐 **Live Application:** [https://shivv2430.github.io/Echoes/](https://shivv2430.github.io/Echoes/)  
📂 **GitHub Repository:** [https://github.com/shivv2430/Echoes](https://github.com/shivv2430/Echoes)

---

## 1. Overview

**Echoes** is an intimate, local-first digital memory keeper designed to help people preserve family oral histories, childhood recollections, cultural traditions, and meaningful moments before they slip away.

Whether recording a grandparent recounting stories from their youth, writing down a treasured family recipe, or documenting a personal milestone, Echoes provides a calm, distraction-free archive.

Unlike typical cloud-based note apps or social media, Echoes operates strictly on your machine. **No personal stories, recordings, or metadata are ever transmitted to external cloud databases, analytics services, or proprietary AI servers.**

---

## 2. Key Features

* **Calm, Human-Crafted Aesthetic:**
  * **Daylight Paper Mode:** Warm ivory card stock (`#FAF7F2`), deep walnut ink, terracotta wax seals, and subtle paper grain.
  * **Night Study Mode:** Candlelit dark leather and bookbinder board (`#171513`) with warm parchment ink and glowing amber highlights.
  * **Tactile Archival Elements:** Accession folio stamps (`№ 179311`), card catalog spines, hand-ruled borders, and paper textures.
* **Oral History Voice Recording:**
  * Built directly into the browser using the **MediaRecorder API**.
  * Live elapsed recording timer, audio playback preview, and in-memory Blob storage.
* **100% Local-First Persistence:**
  * Powered by browser **IndexedDB** (via `idb`).
  * Works fully offline without an internet connection.
* **Archival Search & Filter:**
  * Real-time keyword search across stories, people, places, and tags.
  * Dynamic filter pills for all people and tags cataloged in your archive.
* **Data Sovereignty & Portability:**
  * **Export Backup:** Download your complete archive as a portable, standardized JSON file (including base64 audio archives).
  * **Erase Archive:** Clear all local browser records with permanent confirmation safeguards.

---

## 3. Technology Stack

* **Frontend:** React 19, Vite
* **Styling:** Handcrafted CSS with modern design tokens & CSS variables
* **Local Persistence:** IndexedDB (`idb`)
* **Audio Capture:** Native Browser `MediaRecorder` API
* **Icons:** `lucide-react`
* **Deployment:** GitHub Pages / GitHub Actions

---

## 4. Local Installation & Development

### Prerequisites
* **Node.js** (v18 or higher recommended; developed on Node v24)
* **npm**

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivv2430/Echoes.git
   cd Echoes
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173/`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

---

## 5. Roadmap

* [x] **Week 1: Product Foundation & Local-First Archive** (Completed)
  * Full CRUD, MediaRecorder audio capture, IndexedDB storage, search/filters, daylight/night study themes, JSON export.
* [ ] **Week 2: Open-Weight AI (Ollama Integration)**
  * Connect to local Ollama instance (`llama3.2:3b`).
  * Automatic suggestion of titles and faithful summaries.
  * Strict hallucination controls (never inventing facts or events).
* [ ] **Week 3: Natural Language Retrieval ("Ask Your Memories")**
  * Local Q&A over saved memories with explicit source citations.
* [ ] **Week 4: Audio Transcription & Demo Presentation**
  * Local speech-to-text integration and offline demonstration video.

---

## 6. Privacy Disclosure

Echoes is engineered with privacy as a fundamental constraint:
* All stories and audio recordings reside entirely inside your browser's local IndexedDB on this device.
* Clearing your browser profile or cache removes stored data unless previously exported.
* Use the **Export Backup** feature in the header to preserve safe offline copies of your family archive.
