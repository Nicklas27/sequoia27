sequioa27 STUDIO — Desktop App Setup
======================================

WHAT YOU NEED (one-time installs)
-----------------------------------
1. Node.js — https://nodejs.org  (download the LTS version, run the installer)
   After installing, open Command Prompt and type:
      node --version
   You should see something like: v20.x.x

That's the only requirement.


FIRST-TIME SETUP (do this once)
---------------------------------
1. Open Command Prompt (Windows) or Terminal (Mac)
2. Navigate to this folder:
      cd path\to\sequioa27-studio
   (Right-click the sequioa27-studio folder → "Copy as path", then paste after cd)

3. Install dependencies (downloads Electron — about 150MB, takes 1–2 min):
      npm install

4. Test it runs:
      npm start

   The app window opens. If it looks correct, you're done with setup.


BUILD YOUR INSTALLER (creates the .exe or .dmg)
------------------------------------------------
In the same Command Prompt / Terminal window:

   Windows:
      npm run build:win
   
   Mac:
      npm run build:mac

   Both:
      npm run build:all

When it finishes, open the  dist/  folder inside sequioa27-studio.
You'll find:

   Windows:  dist/sequioa27 Studio Setup 1.0.0.exe
   Mac:      dist/sequioa27 Studio-1.0.0.dmg

Run that installer once. The app installs like any normal program:
- Windows: Start Menu → sequioa27 Studio
- Mac: Applications → sequioa27 Studio

Double-click to open. No server. No terminal. No background processes.


HOW YOUR DATA IS STORED
------------------------
Data is saved to a JSON file on your hard drive — NOT in the browser.
Nothing is ever online or in the cloud.

Windows path:
  C:\Users\<YourName>\AppData\Roaming\sequioa27-studio\studio-data.json

Mac path:
  ~/Library/Application Support/sequioa27-studio/studio-data.json

This file is updated automatically every time you make a change (300ms debounce).
You will never lose data by clearing browser history, because the browser
is not involved at all — the data file is entirely separate.

TIP: You can copy studio-data.json to another computer and it will import
all your tasks, meetings, and goals exactly as they were.


BACKUP
-------
Use the ⬇ Export button inside the app at any time to save a portable
JSON backup anywhere you like — USB drive, cloud folder, email to yourself.
Use ⬆ Import to restore it.

You can also just copy the studio-data.json file above directly.


UPDATING THE APP
----------------
If you receive an updated version of this folder:
1. Replace the app/ folder contents with the new files
2. Run  npm run build:win  (or mac) again
3. Run the new installer — it will update over the existing app


RUNNING WITHOUT BUILDING (dev mode)
-------------------------------------
You can always skip the build step and just run:
   npm start
This opens the app directly without installing — useful for testing.
Data still saves to the same file, so nothing is lost between dev runs and
the installed version.


TROUBLESHOOTING
----------------
"npm: command not found"
  → Node.js is not installed or not on your PATH. Re-run the Node installer
    and make sure to check "Add to PATH" during setup.

"electron: command not found" after npm install
  → Run: npx electron .   instead of npm start

App opens but shows blank page
  → Make sure the app/ folder is inside sequioa27-studio/ and contains index.html

Build fails with "cannot find module"
  → Delete the node_modules folder and run npm install again

Data file disappeared
  → Check the AppData path above. You can also restore from an Export backup.
