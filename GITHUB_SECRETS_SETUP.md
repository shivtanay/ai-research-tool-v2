# GitHub Secrets Setup Guide

## How to Add Your Gemini API Key as a GitHub Secret

Your CI/CD workflows are configured to use `GEMINI_API_KEY` as a GitHub Secret. Follow these steps to set it up:

### Steps:

1. **Go to your GitHub repository:**
   - Navigate to: https://github.com/shivtanay/ai-research-tool-v2

2. **Open Settings:**
   - Click on the **Settings** tab at the top right

3. **Navigate to Secrets and Variables:**
   - In the left sidebar, click on **Secrets and variables** > **Actions**

4. **Create a New Secret:**
   - Click the green **New repository secret** button

5. **Add the Secret:**
   - **Name:** `GEMINI_API_KEY`
   - **Secret Value:** Paste your API key from https://aistudio.google.com/apikey
   - Click **Add secret**

6. **Done!** 🎉
   - The secret is now available to your workflows
   - Your app will use this key during build and deployment

### Your Current API Key Location:
- Local development: `.env.local` file
- GitHub deployment: Repository secret `GEMINI_API_KEY`

### Next Steps:
1. Add the secret to GitHub (follow steps above)
2. Re-run the deployment workflow
3. Visit your live app at: https://shivtanay.github.io/ai-research-tool-v2/
