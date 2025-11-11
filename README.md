# AI Research Synthesizer

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

Your virtual assistant for navigating the frontiers of scientific discovery. This AI-powered tool analyzes research topics across multiple disciplines to identify patterns, research gaps, and generate novel hypotheses.

## Features

- 🔬 **Multi-disciplinary Analysis**: Supports Physics, Chemistry, Biology, Computer Science, Neuroscience, and Materials Science
- 🧠 **AI-Powered Insights**: Uses Google's Gemini AI to analyze scientific literature
- 🎯 **Pattern Recognition**: Identifies emerging trends and recurring themes
- 🔍 **Gap Analysis**: Pinpoints unanswered questions in current research
- 💡 **Hypothesis Generation**: Creates novel, testable hypotheses based on analysis
- 🧪 **Experiment Suggestions**: Proposes concrete experiments to validate hypotheses

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/AI-Research-Synthesizer.git
   cd AI-Research-Synthesizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env.local` file in the root directory
   - Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Add your API key to `.env.local`:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push your code to the `main` branch

2. **Set up GitHub Secrets:**
   - Go to your repository Settings > Secrets and variables > Actions
   - Add a new secret named `GEMINI_API_KEY` with your API key value

3. **Enable GitHub Pages:**
   - Go to Settings > Pages
   - Select "Deploy from a branch"
   - Choose the `gh-pages` branch as the source
   - The GitHub Action will automatically build and deploy your app

### Option 2: Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **AI Integration**: Google Gemini API
- **Deployment**: GitHub Pages, GitHub Actions

## Usage

1. Enter a research topic or question in the text area
2. Select relevant scientific disciplines
3. Click "Synthesize Research" to generate analysis
4. Review the AI-generated insights including:
   - Patterns and emerging trends
   - Research gaps
   - Novel hypotheses
   - Suggested experiments

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google AI Studio for providing the Gemini API
- The open-source community for the amazing tools and libraries
