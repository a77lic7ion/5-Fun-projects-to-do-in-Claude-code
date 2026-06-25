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
  prerequisites: string[];
  steps: Step[];
}

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "Lesson 1: Building Your First Web App with Claude Code (Windows)",
    overview: "This lesson introduces the fundamental workflow of Claude Code on Windows by guiding users through building a simple web application.",
    prerequisites: [
      "A PC running Windows.",
      "A Claude Pro, Max, or Team subscription.",
      "Windows Terminal (recommended) or PowerShell.",
      "Git for Windows installed."
    ],
    steps: [
      {
        id: 1,
        title: "Install Claude Code on Windows",
        description: "Open Windows Terminal as administrator and run the installation command.",
        command: "winget install Anthropic.ClaudeCode",
        why: "winget is the native package manager for Windows, providing a streamlined method for installing applications. Running as administrator ensures the installation has necessary permissions.",
        how: "This command instructs winget to download and install the Claude Code CLI tool onto your Windows system."
      },
      {
        id: 2,
        title: "Initial Setup and Authorization",
        description: "Launch the Claude Code CLI and initiate the first-time setup process.",
        command: "claude",
        why: "This command launches the Claude Code CLI, initiating the first-time setup process on your Windows machine.",
        how: "Claude Code will prompt you through configuration steps and open your web browser to authorize your Claude subscription."
      },
      {
        id: 3,
        title: "Building the App - Plan Mode",
        description: "Press Shift + Tab to enter Plan Mode and provide a detailed prompt for your bookmark app.",
        command: "Create a new folder on my Desktop called my-bookmarks-app, then build me a personal bookmark dashboard as a single HTML file inside it.",
        why: "Plan Mode allows Claude Code to generate an implementation plan first, ensuring the generated code aligns with your vision and optimizing AI token usage.",
        how: "Claude Code analyzes your prompt and proposes a structured approach before writing any code."
      },
      {
        id: 4,
        title: "Testing and Iterating",
        description: "Launch the web app in your default Windows browser and add new features.",
        command: "Open the app in my browser so I can see it",
        why: "This command instructs Claude Code to launch the web app in your default Windows browser for immediate testing.",
        how: "Claude Code performs 'surgical edits', inserting only the new code needed without rewriting the entire app."
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Lesson 2: Building a Retro 2D Game (Windows)",
    overview: "This lesson focuses on building an interactive retro 2D space shooter game on Windows.",
    prerequisites: [
      "All prerequisites from Lesson 1.",
      "An IDE like Cursor or VS Code for Windows.",
      "Basic understanding of game concepts."
    ],
    steps: [
      {
        id: 1,
        title: "Set Up the Project on Windows",
        description: "Open an empty folder in Cursor or VS Code on your PC and run Claude Code.",
        command: "claude --dangerously-skip-permissions",
        why: "This flag allows Claude Code to modify files in your Windows project folder without repeated permission prompts.",
        how: "It bypasses the confirmation step for every file creation or modification."
      },
      {
        id: 2,
        title: "Find and Integrate Game Assets",
        description: "Ask Claude Code to find free pixel art assets and browse your folder.",
        why: "This ensures Claude is aware of the Windows file paths for sprites and backgrounds.",
        how: "You download the assets manually and Claude indexes the files in your project directory."
      },
      {
        id: 3,
        title: "Draft the Game Specification",
        description: "Prompt Claude Code to write a game specification (spec.md) using Phaser.js.",
        why: "A spec document guides the AI across multiple development sessions.",
        how: "Claude will structure a Markdown document outlining the game's requirements and milestones."
      }
    ]
  },
  {
    id: "lesson-3",
    title: "Lesson 3: Building a Mobile App with React Native and Expo (Windows)",
    overview: "This lesson guides Windows users through building a cross-platform mobile application using Claude Code, React Native, and Expo.",
    prerequisites: [
      "Node.js and npm/yarn installed on Windows.",
      "Expo Go app installed on your physical mobile device."
    ],
    steps: [
      {
        id: 1,
        title: "Initializing the Project",
        description: "Ensure Node.js is installed on your PC, then initialize an Expo project.",
        command: "npx create-expo-app habit-tracker-2026",
        why: "This sets up the boilerplate for a new React Native application using Expo.",
        how: "It downloads the necessary dependencies and creates the project structure."
      },
      {
        id: 2,
        title: "Live Preview on Windows",
        description: "Start the Expo development server to preview your app.",
        command: "npx expo start",
        why: "This runs the local development server that communicates with the Expo Go app on your phone.",
        how: "Scan the QR code shown in your Windows Terminal with your phone's camera to open the app."
      },
      {
        id: 3,
        title: "Enhancing AI with Agent Skills",
        description: "Add Expo specific skills to Claude Code.",
        command: "npx skills add expo/skills",
        why: "This gives Claude Code specific context and capabilities for building React Native applications.",
        how: "Select the 'building-native-ui' skill to guide Claude in mobile-specific design."
      }
    ]
  },
  {
    id: "lesson-4",
    title: "Lesson 4: Building and Deploying a Full-Stack App (Windows)",
    overview: "This lesson covers building a full-stack tennis court booking app on Windows, including database integration and authentication.",
    prerequisites: [
      "Claude Desktop App for Windows.",
      "A Neon.tech account.",
      "A GitHub and Vercel account."
    ],
    steps: [
      {
        id: 1,
        title: "Scaffolding on Windows",
        description: "Create a folder and ask Claude to start planning.",
        command: "Let's build a tennis court booking app. Start with a plan.",
        why: "Claude will run npx create-next-app@latest to set up the project automatically based on your prompt.",
        how: "It uses the Next.js CLI to generate a full-stack application structure."
      },
      {
        id: 2,
        title: "Backend Integration",
        description: "Set up a database and configure secure environment variables.",
        command: "openssl rand -base64 32",
        why: "This generates a secure cookie secret for authentication.",
        how: "Manually create a .env file in your Windows IDE to keep sensitive keys off your public filesystem areas."
      }
    ]
  },
  {
    id: "lesson-5",
    title: "Lesson 5: Creating a Custom MCP Server (Windows)",
    overview: "Learn to extend Claude Code on Windows by building a custom MCP server for local file organization.",
    prerequisites: [
      "Python installed on Windows.",
      "Basic understanding of Python."
    ],
    steps: [
      {
        id: 1,
        title: "Windows Environment Setup",
        description: "Create a virtual environment and install dependencies.",
        command: "python -m venv venv && .\\venv\\Scripts\\activate && pip install mcp[cli] pydantic",
        why: "A virtual environment isolates your project's dependencies from other Python projects.",
        how: "It uses the built-in venv module to create an isolated Python installation."
      },
      {
        id: 2,
        title: "Connect to Claude Code on Windows",
        description: "Configure Claude Code to use your new MCP server.",
        why: "You need to tell Claude Code where to find your custom tools.",
        how: "Locate settings.json in your %USERPROFILE%\\.claude directory and add the server config with Windows-style paths."
      }
    ]
  }
];
