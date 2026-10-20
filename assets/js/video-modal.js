(() => {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('projectWalkthroughVideo');
    const title = document.getElementById('videoModalTitle');
    const error = document.getElementById('videoModalError');
    if (!modal || !player || !title || !error) return;

    let lastFocusedElement = null;

    function openVideo(button) {
        const videoPath = button.dataset.video;
        if (!videoPath) return;
        lastFocusedElement = button;
        title.textContent = button.dataset.title || 'Project walkthrough';
        error.hidden = true;
        player.pause();
        player.removeAttribute('src');
        player.load();
        player.src = videoPath;
        player.load();
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('video-modal-open');
        const closeButton = modal.querySelector('.video-modal__close');
        if (closeButton) closeButton.focus();
        // Attempt playback; if the browser blocks it, the visitor can press Play.
        const playAttempt = player.play();
        if (playAttempt && typeof playAttempt.catch === 'function') playAttempt.catch(() => {});
    }

    function closeVideo() {
        player.pause();
        player.removeAttribute('src');
        player.load();
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('video-modal-open');
        error.hidden = true;
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    document.addEventListener('click', (event) => {
        const trigger = event.target.closest('.video-demo-btn');
        if (trigger) { openVideo(trigger); return; }
        if (event.target.closest('[data-close-video]')) closeVideo();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeVideo();
    });

    player.addEventListener('error', () => {
        if (modal.getAttribute('aria-hidden') === 'false') error.hidden = false;
    });
})();
