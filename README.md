## Witeboard

This is a web-based whiteboard application with the following features:

1. Create or join a shared whiteboard session using room ID.
2. Sketch on the whiteboard in real time.
3. Collaborate with other users by seeing their changes in real time.
4. Save and load whiteboard sessions for later use.
5. Color pickers, shape pickers, undo and redo, eraser, downloading the canvas and sharing the whiteboard room via link.

## Tech Stack:

1. Frontend - Next.js/React.js frameworks along with Typescript
2. Socket.io for real time communication
3. Backend - node and Express.js
4. Recoil for state management
5. Styling- TailwindCSS, React-icons, Framer-motion

You can run the application on your machine:

1. Clone this repository
2. Install the dependencies
```bash
npm install
```
3. Run the developement server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
5. If you run into type issues while running dev server, use:
```bash
npm install --legacy-peer-deps
```
## Deployment:
This application is deployed on Render

Check here: [https://witeboard.onrender.com/](https://witeboard.onrender.com/)

Note- Render requires payment credentials after inactivity and has put some restrictions on the whiteboard application.
