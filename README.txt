PORTFOLIO VIDEO POPUP PATCH

This is a patch for your existing static HTML/CSS/JavaScript portfolio, not a complete replacement for the whole project. It preserves the project cards and adds a Watch Demo button that opens a responsive in-page video popup.

HOW TO APPLY
1. Make a backup of your current portfolio folder.
2. Extract this ZIP.
3. Copy the included index.html into your portfolio folder, replacing the old index.html.
4. Copy the included assets/css/video-modal.css and assets/js/video-modal.js into the matching folders in your portfolio. Do NOT replace your existing assets/css/style.css or assets/js/main.js.
5. Create/copy the videos folder beside index.html (the folder is included in this ZIP).
6. Add your MP4 videos using these exact names:
   videos/books-walkthrough.mp4
   videos/library-management.mp4
   videos/inventory-app.mp4
   videos/id-replacement.mp4
7. Open index.html locally to test. Commit/push the changes and redeploy on Vercel.

IMPORTANT
- The ZIP intentionally does not include your existing images, original stylesheet, or main.js, because those should remain from your own project.
- If you do not have a video for a project yet, you can leave that MP4 out; its button will show a helpful error until the matching file is added. You may remove that project's Watch Demo button from index.html if you do not want it visible yet.
- MP4 is a container format. H.264 video with AAC audio is a safe choice for browser compatibility.
- Keep videos reasonably compressed (for example, 720p and short walkthroughs) so your deployed portfolio loads quickly.
