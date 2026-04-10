const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');

const folders = ['layout', 'auth', 'feed', 'alumni', 'donations', 'events', 'news', 'jobs'];
folders.forEach(f => {
  const dir = path.join(componentsDir, f);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const moves = [
  ['Navbar.jsx', 'layout'],
  ['Footer.jsx', 'layout'],
  ['Layout.jsx', 'layout'],
  ['AdminSidebar.jsx', 'layout'],
  ['ProtectedRoute.jsx', 'auth'],
  ['FeedSection.jsx', 'feed'],
  ['PostForm.jsx', 'feed'],
  ['AlumniList.jsx', 'alumni'],
  ['AlumniDir.jsx', 'alumni'],
  ['AlumniProfile.jsx', 'alumni'],
  ['HeroSection.jsx', 'alumni'],
  ['Connection.jsx', 'alumni'],
  ['Donations.jsx', 'donations'],
  ['HomeEvent.jsx', 'events'],
  ['HomeNews.jsx', 'news'],
  ['NewsSection.jsx', 'news'],
  ['Jobs.jsx', 'jobs']
];

moves.forEach(([file, folder]) => {
  const oldPath = path.join(componentsDir, file);
  const newPath = path.join(componentsDir, folder, file);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Moved ${file} to ${folder}`);
  }
});

// Rename Images to assets
const imagesDir = path.join(srcDir, 'Images');
const assetsDir = path.join(srcDir, 'assets');
if (fs.existsSync(imagesDir)) {
  fs.renameSync(imagesDir, assetsDir);
  console.log('Renamed Images to assets');
}

// Rename pages/Admin to pages/admin
const adminOld = path.join(srcDir, 'pages', 'Admin');
const adminNew = path.join(srcDir, 'pages', 'admin');
if (fs.existsSync(adminOld)) {
  fs.renameSync(adminOld, adminNew);
  console.log('Renamed pages/Admin to pages/admin');
}

console.log('Done moving files.');
