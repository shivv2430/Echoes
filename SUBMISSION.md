*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

## What I Built

Between late October and early November—as Halloween shifts into Día de los Muertos—the boundary between what is remembered and what is forgotten feels remarkably thin. We set out ofrendas, light candles, and tell stories of the people whose voices once filled the kitchen. But human memory is fragile. When an elder passes away, an entire library of unwritten family traditions, quiet childhood recollections, and oral histories vanishes with them.

I built **Echoes: A Private Memory Keeper**.

Echoes is an intimate, local-first web archive designed to capture oral family histories, preserve spoken voices, and catalog personal recollections before they wander away.

Unlike cloud note apps, corporate productivity dashboards, or generic chatbots, Echoes is designed around an unbending core belief: **our most personal memories belong to the people who create them, not to a remote cloud server.**

### Key Highlights
* **Voice & Oral History Capture:** Record spoken memories right through the browser using the native `MediaRecorder` API, complete with live timing, waveform status, and instant review playback.
* **Handcrafted Archival Aesthetics:**
  * **Daylight Paper Mode:** Warm ivory card stock (`#FAF7F2`), deep walnut ink, terracotta wax seals, and tactile paper grain.
  * **Night Study (Candlelight) Mode:** Rich dark bookbinding leather (`#171513`), glowing ember terracotta, eucalyptus sage, and warm candlelight gold.
  * **Tangible Archival Elements:** Accession folio stamps (`№ 179311`), card catalog book spines, hand-ruled borders, and catalog slips.
* **100% Local-First Engine:** All stories, audio clips, and metadata persist inside the browser's `IndexedDB`. The application runs 100% offline with zero cloud latency.
* **Archival Search & Filter:** Real-time keyword filtering across stories, people involved, locations, and custom tag pills.
* **Data Sovereignty:** One-click portable JSON export with embedded audio archives, plus permanent erasure options.

---

## Demo

Experience the live deployed application:
👉 **[https://shivv2430.github.io/Echoes/](https://shivv2430.github.io/Echoes/)**

*Tip: Try clicking the "Daylight" / "Night Study" button in the upper right to experience the candlelit archive mode, or click one of the gentle oral history prompts to begin recording.*

---

## Code

The complete source code is open source under MIT on GitHub:

{% github shivv2430/Echoes %}

GitHub Repository Link: **[https://github.com/shivv2430/Echoes](https://github.com/shivv2430/Echoes)**

---

## How I Built It

Echoes was architected with simplicity, tactile empathy, and complete user sovereignty in mind:

* **Frontend & Build:** Built using **React 19** and **Vite**, maximizing runtime speed and maintaining a lightweight footprint.
* **Zero-Cloud Storage (IndexedDB + `idb`):** All written memoirs and raw voice recordings are stored directly in the browser's persistent IndexedDB storage engine. Audio recordings are handled as raw binary Blobs, ensuring full playback capability without external hosting.
* **Audio Capture:** Native browser `MediaRecorder` API with granular microphone permission states, hardware track clean-up, and elapsed timers.
* **Local-First Open-Weight AI Architecture:**
  * Echoes is engineered to connect to local open-weight language models via **Ollama** running on-device (e.g., `llama3.2:3b` or `gemma2:2b`).
  * Inference executes locally via `http://localhost:11434`, ensuring that voice transcriptions, memory summarization, and natural language retrieval ("What did Grandpa tell me about his childhood?") never leave the host machine.
  * Strict negative constraint prompting prevents the model from hallucinating dates, relationships, or details not found in the archive.

---

## Why Does Open Innovation Matter?

When you record your grandmother talking about fleeing a war, a mother explaining her secret holiday recipe, or your own private confessions from childhood, **you are not dealing with "user content"—you are dealing with a person's soul.**

If you build this on proprietary cloud APIs:
1. **The Privacy Breach:** Private family names, intimate grief, and spoken audio get transmitted to remote data centers, analyzed by closed corporate models, and stored on servers you do not control.
2. **The Obsolescence Trap:** When a SaaS startup changes its pricing or shuts down its servers, those memories are locked behind paywalls or erased forever.
3. **The Offline Reality:** The moments when oral histories are recorded—around a campfire, in an old country house, or at an elder's bedside—often happen with the lights low and the internet disconnected.

Open innovation changed everything:
* **Open-weight models (like Llama and Gemma)** prove that high-quality synthesis, summarization, and question-answering no longer require sending data across the Pacific Ocean. A compact 3B model running on a laptop's unified memory performs faithfully without a single byte leaving the room.
* **Open web standards (`IndexedDB`, `MediaRecorder`, Web Audio)** allow a browser to become an independent archival vault that continues working indefinitely, even if the developer never pushes another update.

Open-source AI transforms technology from a digital landlord into an honest personal instrument.

---

## My Agent Session

This application was designed and built iteratively with **Antigravity (Advanced Agentic AI)**. The pair-programming workflow focused on creating a handcrafted, human-first design system, robust local persistence via IndexedDB, and browser MediaRecorder audio pipeline.

---

## The Spirit of It

During testing, I sat down and recorded a short oral clip of an old family story: the recipe for Sunday vegetable stew that my family made during rainy seasons decades ago, complete with the wooden kitchen table and the smell of cardamom.

Listening back to that recording—sitting in the quiet "Night Study" mode with the warm paper glow and catalog mark `№ 179311`—it didn't feel like staring at software. It felt like holding a real journal. 

That is the true ghost in the machine: not a creepy phantom haunting our circuits, but the echoes of the people we love, preserved faithfully on our own terms.

---

## Prize Categories

* **Hacktoberfest Open-Source AI Challenge: Week 4 (Ghost in the Machine)** — Overall Winner & Local-First AI Innovation
