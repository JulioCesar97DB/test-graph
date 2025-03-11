# ReactFlow Diagram Editor

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.9-38B2AC?logo=tailwind-css&logoColor=white)
![ReactFlow](https://img.shields.io/badge/ReactFlow-12.4.4-007ACC?logo=flow&logoColor=white)

## 📋 Project Overview

An interactive diagram creation tool similar to Draw.io, built with React Flow. Create hierarchical diagrams with drag-and-drop simplicity.

![Project Demo](https://via.placeholder.com/800x400?text=ReactFlow+Diagram+Editor+Demo)

## ✨ Features

- **Hierarchical Node System** - Create parent-child relationships between nodes
- **Drag and Drop Interface** - Simple and intuitive diagram building
- **Multiple Node Types** - Subscription, Resource Group, and VNet nodes
- **Node Resizing** - Customize node dimensions with the resize handle
- **Properties Panel** - View and edit node properties in real-time
- **Mini Map** - Navigate large diagrams with ease

## 🚀 Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/test-drawio.git
cd test-drawio
```

2. **Install dependencies**

```bash
npm install
# or
yarn
```

3. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open in your browser**

Navigate to `http://localhost:5173` to see the application running.

## 💻 Usage Guide

### Creating Nodes

1. Drag a node type from the left sidebar onto the canvas
2. Nested nodes (Resource Groups, VNets) must be dropped within their parent containers
3. Click on nodes to see and edit their properties in the right sidebar

### Node Hierarchy

- **Subscription Nodes** - Top-level containers
- **Resource Group Nodes** - Must be placed inside Subscription nodes
- **VNet Nodes** - Must be placed inside Resource Group nodes

### Editing Nodes

- Click any node to see its properties in the right sidebar
- Resize nodes using the handle icon at the bottom-right corner
- Drag nodes to reposition them within their parent containers

## 🛠️ Project Structure

```
src/
├── components/         # UI components
│   ├── CustomNodes.tsx # Node type definitions
│   ├── Sidebar.tsx     # Left sidebar with node types
│   └── PropertiesSidebar.tsx # Right sidebar for properties
├── context/
│   └── DnDContext.tsx  # Drag and drop context provider
├── App.tsx            # Main application component
├── DnDFlow.tsx        # Flow diagram logic
└── main.tsx           # Application entry point
```

## 🔧 Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Flow** - Diagram creation library
- **TailwindCSS** - Styling

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by Julio Cesar Diaz

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
