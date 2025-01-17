#!/usr/bin/env bash
set -e

# 1. Remove old CRA scripts & references in package.json
echo "Removing Create React App packages from package.json..."
npx json -I -f package.json -e '
  if (this.dependencies && this.dependencies["react-scripts"]) {
    delete this.dependencies["react-scripts"];
  }
  if (this.devDependencies && this.devDependencies["react-scripts"]) {
    delete this.devDependencies["react-scripts"];
  }
  if (this.devDependencies && this.devDependencies["react-app-rewired"]) {
    delete this.devDependencies["react-app-rewired"];
  }
  // Remove or rename old scripts
  if (this.scripts) {
    delete this.scripts.start;
    delete this.scripts.build;
    delete this.scripts.eject;
  }
'

# 2. Install Vite if not installed
echo "Installing Vite and plugin for React..."
npm install -D vite @vitejs/plugin-react

# 3. Add new Vite scripts to package.json
echo "Adding 'dev', 'build', 'preview' to scripts..."
npx json -I -f package.json -e '
  this.scripts = this.scripts || {};
  // dev command for local dev server
  this.scripts.dev = "vite";
  // build command for production
  this.scripts.build = "vite build";
  // optional preview command
  this.scripts.preview = "vite preview";
'

# 4. Remove leftover CRA files/folders if you want to
echo "Cleaning up leftover CRA files..."
rm -f config-overrides.js 2>/dev/null || true
rm -rf build 2>/dev/null || true
# If you want to remove the 'public' folder because you're going to put index.html at root:
#   rm -rf public 2>/dev/null || true
# Or rename 'public/index.html' => 'index.html' at project root:
#   mv public/index.html ./index.html
#   rm -rf public

# 5. Create a basic 'vite.config.js' if you don't already have one
if [ ! -f vite.config.js ]; then
  cat <<EOF > vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  build: {
    outDir: 'dist'
  }
})
EOF
  echo "Created a basic vite.config.js"
fi

# 6. If your CLI is in 'src/front-end/cli.ts' or similar, 
#    you can keep that. Vite is mostly for the React UI.
#    If you want a single entry for the UI, ensure you have an 'index.html'.
if [ ! -f index.html ]; then
  cat <<EOF > index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Nexxus Seed with Vite</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/index.ts"></script>
  </body>
</html>
EOF
  echo "Created a basic index.html for Vite dev server."
fi

# 7. Reinstall dependencies to ensure everything is consistent
echo "Reinstalling node_modules..."
rm -rf node_modules package-lock.json
npm install

echo "All done! Now you can run 'npm run dev' to start the Vite dev server."
