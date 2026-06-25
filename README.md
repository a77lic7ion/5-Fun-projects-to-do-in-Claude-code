# Claude Code Windows Guide

A comprehensive, locally-run Windows application designed to teach users how to leverage Claude Code for various development tasks. This interactive guide breaks down complex projects into digestible, actionable steps tailored specifically for the Windows environment.

## Overview

This application serves as an interactive tutorial for learning Claude Code on a Windows PC. It guides you through five distinct projects, ranging from a simple web application to advanced custom tool integration.

### Projects Covered:

1. **Building Your First Web App:** A gentle introduction to the Claude Code workflow on Windows, focusing on basic web development (HTML/JS) and the "Prompt, Plan, Generate, Test" cycle.
2. **Building a Retro 2D Game:** Learn how to handle game logic, assets, and iteration with Claude Code by building a space shooter using Phaser.js.
3. **Building a Mobile App with React Native and Expo:** Discover how to build cross-platform mobile apps using Expo and React Native, utilizing specialized AI agent skills.
4. **Building and Deploying a Full-Stack App:** Dive into full-stack development with Next.js, database integration (Neon.tech), and deployment to Vercel.
5. **Creating a Custom MCP Server:** Extend Claude Code's capabilities by building a custom Model Context Protocol (MCP) server in Python to interact with your local Windows file system.

## Features

- **Interactive Lessons:** Step-by-step guidance for each project.
- **Windows-Specific Instructions:** Commands and paths are tailored for Windows Terminal and PowerShell.
- **Integrated Chatbot Tutor:** A built-in Gemini-powered chatbot ready to assist you if you encounter errors or need clarification on any step.
- **Progress Tracking:** Mark steps as complete and visually track your progress through each lesson.
- **Code Execution Guidance:** Explains exactly what commands to run, why you are running them, and how they work behind the scenes.

## Getting Started

### Prerequisites for Running This App
- Node.js (v18 or higher)
- npm (Node Package Manager)

### Installation

1. Clone this repository or download the source code.
2. Open your terminal in the project directory.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   - Create a `.env` file based on `.env.example`.
   - Ensure you add your `GEMINI_API_KEY` for the chatbot to function.

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Architecture

This is a full-stack React application built with:
- **Frontend:** React, Tailwind CSS (styled with a custom 'Geometric Balance' dark theme), Framer Motion for animations.
- **Backend:** Express.js for the API layer to securely interact with the Gemini AI model.
- **AI Integration:** `@google/genai` SDK with the Gemini 3.1 Pro model configured for high-level thinking to provide expert tutoring.

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improving the lessons or adding new Windows-specific tips and tricks!
