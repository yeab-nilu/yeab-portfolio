// Mobile navigation, active section highlighting, and current copyright year.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = [...document.querySelectorAll('.site-nav a')];

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      toggle.innerHTML = isOpen ? '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.innerHTML = '<i class="bx bx-menu"></i>';
    }));
  }

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});


const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const sendBtn = document.getElementById("sendBtn");
    const formStatus = document.getElementById("formStatus");

    // Your actual Formspree form ID
    const formspreeId = "xljgzvze";

    sendBtn.disabled = true;
    sendBtn.innerHTML =
      'Sending... <i class="bx bx-loader-alt"></i>';

    formStatus.textContent = "";
    formStatus.className = "";

    try {
      const response = await fetch(
        `https://formspree.io/f/${formspreeId}`,
        {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.errors?.map(error => error.message).join(", ") ||
          "Message could not be sent."
        );
      }

      formStatus.textContent =
        "Your message was sent successfully. Thank you!";
      formStatus.className = "success";

      contactForm.reset();

    } catch (error) {
      console.error("Contact form error:", error);

      formStatus.textContent =
        error.message ||
        "Sorry, your message could not be sent. Please try again.";
      formStatus.className = "error";

    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML =
        'Send Message <i class="bx bx-send"></i>';
    }
  });

}

/* Project demo video popup */
const videoModal = document.getElementById("videoModal");
const demoVideo = document.getElementById("projectDemoVideo");
const videoTitle = document.getElementById("videoModalTitle");
const closeVideoModal = document.getElementById("closeVideoModal");

let lastDemoButton = null;

function openVideoModal(button) {
  if (!videoModal || !demoVideo) return;

  const videoPath = button.dataset.video;
  const title = button.dataset.title || "Project Demo";

  lastDemoButton = button;
  videoTitle.textContent = title;

  demoVideo.pause();
  demoVideo.removeAttribute("src");
  demoVideo.load();

  demoVideo.src = videoPath;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("video-modal-open");

  closeVideoModal.focus();

  // Try to start playback. Visitors can press Play if blocked.
  const playPromise = demoVideo.play();

  if (playPromise) {
    playPromise.catch(() => {
      // Autoplay may be blocked by the browser.
    });
  }
}

function closeDemoModal() {
  if (!videoModal || !demoVideo) return;

  demoVideo.pause();
  demoVideo.removeAttribute("src");
  demoVideo.load();

  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("video-modal-open");

  if (lastDemoButton) {
    lastDemoButton.focus();
  }
}

document.querySelectorAll(".watch-demo-button").forEach((button) => {
  button.addEventListener("click", () => {
    openVideoModal(button);
  });
});

if (closeVideoModal) {
  closeVideoModal.addEventListener("click", closeDemoModal);
}

if (videoModal) {
  videoModal.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      closeDemoModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    videoModal &&
    videoModal.classList.contains("is-open")
  ) {
    closeDemoModal();
  }
});
