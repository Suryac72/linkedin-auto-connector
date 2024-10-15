# LinkedIn Auto Connector Chrome Extension

A Chrome extension that automatically sends connection requests to a list of people on LinkedIn search results. For example, you can search for all CEOs in Bangalore on LinkedIn, and the extension will automatically press the "Connect" button for each profile on the first page of the search results. The extension waits a random amount of time between 5-10 seconds before sending each connection request to avoid detection.

The extension is implemented using **React**, **Vite**, and **TypeScript**. Unit tests for UI components are also included.

## Features
- Automatically sends connection requests to people in a LinkedIn search.
- Works on the first page of LinkedIn search results.
- Random delay (between 5-10 seconds) between each connection request.
- Supports manual start and stop of the connection process.
- Built with modern web technologies: React, Vite, and TypeScript.
- Includes unit tests for React UI components.

## Getting Started

### Prerequisites

Make sure you have the following tools installed:

- **Node.js**: v14 or above
- **npm** ( Node Package manager )

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/suryac72/linkedin-auto-connector.git
   ```
2. Install Packages:

   ```bash
   npm install
   ```
3. Run Build Script:

    ```bash
    npm run build
    ```
4. Open Google Chrome and type `chrome://extensions/` on place of URL

5. On Top-Right Corner, There is one toggle of `Developer Mode`, Turn it on

6. After that, there is one option of `load unpacked` on top-left of the screen. Upload dist folder on it. After that you will see `Linkedin AutoConnect Extension` on your extension lists

7. Now, Go to `linkedin.com` and search for recruiters and enable the extension. It start sending connection request automatically as per problem statement