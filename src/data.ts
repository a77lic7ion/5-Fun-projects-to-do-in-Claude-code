export interface Step {
  id: number;
  title: string;
  description: string;
  command?: string;
  code?: string;
  why: string;
  how: string;
  output?: string;
}

export interface Lesson {
  id: string;
  title: string;
  overview: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  achievements: string[];
  prerequisites: string[];
  preflightChecks: string[];
  steps: Step[];
}

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Lesson 1: Building Your First Web App with Claude Code",
    overview: "This lesson introduces the fundamental workflow of Claude Code on Windows by guiding you step-by-step through building a simple personal bookmark dashboard. You will learn the 'Prompt, Plan, Generate, Test' iterative cycle.",
    difficulty: "Beginner",
    achievements: [
      "Understand how to install and authorize Claude Code on Windows.",
      "Master Plan Mode for structured code generation.",
      "Build a functional, responsive web application.",
      "Learn how to prompt Claude for surgical edits and new features."
    ],
    prerequisites: [
      "A PC running Windows 10 or 11.",
      "A Claude Pro, Max, or Team subscription (required for Claude Code).",
      "Windows Terminal (highly recommended) or PowerShell."
    ],
    preflightChecks: [
      "Ensure you have internet connectivity.",
      "Open your Start menu and search for 'Windows Terminal' to ensure it is installed.",
      "Verify you know your Claude account login credentials."
    ],
    steps: [
      {
        id: 1,
        title: "Open Windows Terminal as Administrator",
        description: "Press the Windows key, type 'Terminal', right-click the 'Terminal' app, and select 'Run as administrator'. Click 'Yes' on the User Account Control prompt.",
        why: "Installing system-wide tools often requires elevated privileges to write to system directories.",
        how: "Running as administrator grants your terminal session the necessary permissions to install software globally on your Windows machine."
      },
      {
        id: 2,
        title: "Install Claude Code",
        description: "In your administrator terminal, paste the following command and press Enter.",
        command: "winget install Anthropic.ClaudeCode",
        why: "winget is the official package manager for Windows, providing a safe and streamlined method for installing applications directly from the command line.",
        how: "This command reaches out to the Microsoft package repository, downloads the Claude Code installer, and automatically executes it."
      },
      {
        id: 3,
        title: "Initial Setup and Authorization",
        description: "Close your administrator terminal, open a regular Windows Terminal, and type the command below to start Claude Code.",
        command: "claude",
        why: "You must link your local CLI tool to your paid Claude account to use the AI models.",
        how: "Claude Code will prompt you through configuration steps and open your default web browser. You will sign in, authorize the app, and then return to your terminal."
      },
      {
        id: 4,
        title: "Create a Workspace",
        description: "Create a new folder for your project and navigate into it.",
        command: "mkdir Desktop\\my-bookmarks-app && cd Desktop\\my-bookmarks-app",
        why: "It is best practice to contain each project within its own directory to avoid clutter and scope the AI's context.",
        how: "The 'mkdir' command makes the directory, '&&' chains commands, and 'cd' changes your current working directory to the new folder."
      },
      {
        id: 5,
        title: "Building the App - Plan Mode",
        description: "Inside the Claude interface, press Shift + Tab to enter Plan Mode, paste the prompt below, and press Enter.",
        command: "Build me a personal bookmark dashboard as a single HTML file. It should let me save bookmarks with a title, URL, category, and notes. Save to local storage. Make it look modern with a blue theme.",
        why: "Plan Mode forces Claude Code to generate an implementation plan before writing code, ensuring alignment with your vision and saving API tokens.",
        how: "Claude analyzes your prompt, proposes a structured approach, and asks for your approval before proceeding."
      },
      {
        id: 6,
        title: "Approve the Plan",
        description: "Review the 'Implementation Plan' output by Claude. Type 'yes' or select 'auto-accept edits'.",
        why: "This gives Claude permission to create files on your hard drive based on the plan.",
        how: "Claude will now generate an index.html file containing HTML, CSS, and JavaScript all in one."
      },
      {
        id: 7,
        title: "Testing and Iterating",
        description: "Ask Claude to open the app for you.",
        command: "Open the app in my browser so I can see it",
        why: "You need to see the result to verify it works.",
        how: "Claude will use a Windows system command (like 'start') to launch the HTML file in your default web browser."
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Lesson 2: Building a Retro 2D Game",
    overview: "Learn how to handle game logic, asset integration, and iterative development by building an interactive space shooter game using Claude Code and Phaser.js.",
    difficulty: "Intermediate",
    achievements: [
      "Set up a local web server for game development.",
      "Integrate external assets (images/sounds) into an AI workflow.",
      "Draft and utilize a technical specification document (spec.md).",
      "Manage complex state and iterations with Claude Code."
    ],
    prerequisites: [
      "Completed Lesson 1.",
      "Node.js installed on your PC.",
      "An IDE like VS Code installed."
    ],
    preflightChecks: [
      "Open Terminal and type 'node -v' to ensure Node.js is installed.",
      "Create a folder on your Desktop called 'space-shooter'."
    ],
    steps: [
      {
        id: 1,
        title: "Initialize a Node Project",
        description: "Navigate to your new folder and initialize a basic package.json file.",
        command: "npm init -y",
        why: "A package.json file manages your project's dependencies and scripts.",
        how: "The '-y' flag automatically answers 'yes' to all default setup questions."
      },
      {
        id: 2,
        title: "Install a Local Web Server",
        description: "Games require a web server to load assets properly (due to browser security rules). Install Vite.",
        command: "npm install -D vite",
        why: "Vite is a fast local development server that will serve your game files to your browser and automatically refresh when you make changes.",
        how: "The '-D' flag installs it as a development dependency."
      },
      {
        id: 3,
        title: "Start Claude with Permissions",
        description: "Launch Claude Code with a flag to skip permission prompts for this specific folder.",
        command: "claude --dangerously-skip-permissions",
        why: "When building a complex project with many files, approving every single file edit becomes tedious.",
        how: "This flag tells Claude it is allowed to read and write to the current directory freely."
      },
      {
        id: 4,
        title: "Draft the Game Specification",
        description: "Prompt Claude to write a specification document.",
        command: "Write a detailed game specification (spec.md) for a top-down vertical space shooter using Phaser.js. Include milestones for movement, combat, and enemies.",
        why: "A spec document acts as an anchor. It helps the AI remember the overall goal across multiple prompts and development sessions.",
        how: "Claude will generate a Markdown document outlining the architecture."
      },
      {
        id: 5,
        title: "Execute Milestone 1",
        description: "Tell Claude to begin the first phase of the spec.",
        command: "Let's implement Milestone 1 from spec.md: Core setup, player movement, and simple shooting.",
        why: "Breaking the project into chunks ensures Claude doesn't get overwhelmed or output truncated code.",
        how: "Claude will read the spec, create an index.html, download or link Phaser.js, and write the initial game logic."
      },
      {
        id: 6,
        title: "Run the Game Server",
        description: "Open a SECOND terminal window in the same folder and start your server.",
        command: "npx vite",
        why: "You need the server running to test the game while Claude is busy in the other terminal.",
        how: "This launches a local server, usually accessible at http://localhost:5173."
      }
    ]
  },
  {
    id: "lesson-3",
    title: "Lesson 3: Building a Mobile App with Expo",
    overview: "Build cross-platform mobile applications for iOS and Android using React Native and Expo, guided by specialized AI skills.",
    difficulty: "Advanced",
    achievements: [
      "Set up a React Native development environment on Windows.",
      "Initialize an Expo project.",
      "Use Expo Go for live mobile previews.",
      "Install and utilize Claude Code 'skills' for specialized domain knowledge."
    ],
    prerequisites: [
      "Node.js installed on your PC.",
      "A smartphone (iOS or Android).",
      "The 'Expo Go' app installed on your smartphone from the App Store or Google Play."
    ],
    preflightChecks: [
      "Ensure your PC and smartphone are connected to the exact same Wi-Fi network.",
      "Verify Node.js installation by running 'node -v'."
    ],
    steps: [
      {
        id: 1,
        title: "Initialize Expo Project",
        description: "Use the Expo CLI to scaffold a new React Native application.",
        command: "npx create-expo-app habit-tracker-2026",
        why: "Expo provides a managed workflow for React Native, abstracting away complex native Android/iOS build setups on Windows.",
        how: "This command downloads the Expo template and sets up all necessary configuration files."
      },
      {
        id: 2,
        title: "Navigate to Project",
        description: "Move into your newly created project directory.",
        command: "cd habit-tracker-2026",
        why: "You must be inside the project folder to run its scripts and launch Claude Code.",
        how: "Changes the current working directory."
      },
      {
        id: 3,
        title: "Start Live Preview",
        description: "Start the Expo development server.",
        command: "npx expo start",
        why: "This runs the bundler and generates a QR code.",
        how: "Scan the QR code shown in your Windows Terminal with your phone's camera (iOS) or the Expo Go app (Android) to open the app on your device."
      },
      {
        id: 4,
        title: "Add AI Skills",
        description: "Open a second terminal window in the same folder and add Expo skills to Claude.",
        command: "npx @anthropic-ai/skills add expo/skills",
        why: "React Native has specific UI paradigms. 'Skills' inject specialized documentation and context into Claude's memory.",
        how: "This downloads prompt templates and guidelines specifically designed for building React Native apps."
      },
      {
        id: 5,
        title: "Build the App",
        description: "Start Claude and prompt it to build the interface.",
        command: "claude",
        why: "With skills loaded, Claude will write much better React Native code.",
        how: "Inside Claude, prompt: 'Build a minimalistic habit tracker UI with a list of daily tasks and checkboxes using React Native components.'"
      }
    ]
  },
  {
    id: "lesson-4",
    title: "Lesson 4: Building a Full-Stack App",
    overview: "Create a complete web application with a frontend, backend, and database. You will build a tennis court booking app utilizing Next.js and Neon (PostgreSQL).",
    difficulty: "Advanced",
    achievements: [
      "Scaffold a full-stack Next.js application.",
      "Integrate a remote PostgreSQL database.",
      "Manage secure environment variables.",
      "Deploy the application to Vercel."
    ],
    prerequisites: [
      "Node.js installed.",
      "A free account on neon.tech (Database).",
      "A free account on github.com (Version Control).",
      "A free account on vercel.com (Hosting)."
    ],
    preflightChecks: [
      "Log into Neon.tech and create a new project called 'tennis-app'.",
      "Copy your database connection string from the Neon dashboard."
    ],
    steps: [
      {
        id: 1,
        title: "Scaffold Next.js App",
        description: "Use Claude to initialize the project structure.",
        command: "mkdir tennis-booking && cd tennis-booking && claude",
        why: "Next.js is a powerful framework for full-stack React applications.",
        how: "Inside Claude, prompt: 'Initialize a Next.js app with Tailwind CSS and an App router structure for a tennis booking app.'"
      },
      {
        id: 2,
        title: "Generate Cookie Secret",
        description: "Open a separate terminal window and generate a secure random string.",
        command: "node -e \"console.log(require('crypto').randomBytes(32).toString('base64'))\"",
        why: "Authentication systems require cryptographic secrets to sign cookies securely.",
        how: "This runs a short Node.js script to generate 32 bytes of secure random data."
      },
      {
        id: 3,
        title: "Create Environment Variables",
        description: "Manually create a file named '.env.local' in the root of your project using your IDE.",
        why: "Environment variables keep sensitive data like database passwords out of your source code.",
        how: "Add 'DATABASE_URL=\"your_neon_connection_string\"' and 'AUTH_SECRET=\"your_generated_secret\"' to this file."
      },
      {
        id: 4,
        title: "Implement Database Schema",
        description: "Prompt Claude to set up the database integration.",
        command: "Set up Drizzle ORM to connect to the Neon database using the DATABASE_URL. Create a schema for 'users' and 'bookings'.",
        why: "An ORM (Object-Relational Mapper) makes it easy to interact with a database using JavaScript instead of raw SQL.",
        how: "Claude will install Drizzle, configure the connection, and write the schema files."
      }
    ]
  },
  {
    id: "lesson-5",
    title: "Lesson 5: Creating a Custom MCP Server",
    overview: "Extend Claude Code's capabilities by building a custom Model Context Protocol (MCP) server in Python to interact securely with your local Windows file system.",
    difficulty: "Advanced",
    achievements: [
      "Set up a Python virtual environment on Windows.",
      "Understand the Model Context Protocol (MCP).",
      "Build custom Python tools that Claude can execute.",
      "Link a custom MCP server to the global Claude Code configuration."
    ],
    prerequisites: [
      "Python 3.10+ installed on Windows.",
      "Basic understanding of Python programming."
    ],
    preflightChecks: [
      "Open Terminal and type 'python --version' to ensure Python is in your system PATH.",
      "Create a folder on your Desktop called 'mcp-file-organizer'."
    ],
    steps: [
      {
        id: 1,
        title: "Create Virtual Environment",
        description: "Navigate to your folder and create a Python virtual environment.",
        command: "python -m venv venv",
        why: "Virtual environments isolate your project's Python dependencies from other projects on your system, preventing version conflicts.",
        how: "The 'venv' module creates a folder named 'venv' containing an isolated Python installation."
      },
      {
        id: 2,
        title: "Activate Environment",
        description: "Activate the virtual environment in your Windows Terminal.",
        command: ".\\venv\\Scripts\\activate",
        why: "You must activate the environment so that pip installs packages into the isolated folder, not globally.",
        how: "This script modifies your terminal's PATH temporarily. You should see '(venv)' appear in your command prompt."
      },
      {
        id: 3,
        title: "Install Dependencies",
        description: "Install the required libraries for building an MCP server.",
        command: "pip install mcp[cli] pydantic",
        why: "The 'mcp' package provides the framework for building the server, and 'pydantic' is used for data validation.",
        how: "Pip reaches out to the Python Package Index to download and install these libraries."
      },
      {
        id: 4,
        title: "Build the Server File",
        description: "Create a file named 'server.py' and define your tools using FastMCP.",
        why: "This Python script will act as the bridge between Claude Code and your Windows file system.",
        how: "Inside Claude (in another terminal), prompt: 'Create an MCP server in server.py using FastMCP with a tool that lists files in a given directory.'"
      },
      {
        id: 5,
        title: "Link to Claude Code",
        description: "You must tell Claude Code where this server is. Locate your Claude config file.",
        why: "Claude Code needs the explicit path to your python executable and your server script to launch it.",
        how: "Open '%USERPROFILE%\\.claude\\settings.json' and add the server configuration, ensuring you use absolute Windows paths with forward slashes (e.g., 'C:/Users/Name/Desktop/mcp-file-organizer/venv/Scripts/python.exe')."
      }
    ]
  }
];
