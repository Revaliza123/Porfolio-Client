document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".port-item");
  const contactButton = document.getElementById("contactBtn");

  // --- Contact button ---
  contactButton.addEventListener("click", function () {
    const emailTujuan = "work.muhamadwildan@email.com";

    const subject = encodeURIComponent("Freelance/Collaboration Inquiry");
    const body = encodeURIComponent(
      "Halo Wildan, saya tertarik untuk berdiskusi mengenai...",
    );

    window.location.href = `mailto:${emailTujuan}?subject=${subject}&body=${body}`;
  });

  // --- Portfolio filter ---
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block";
        } else {
          if (item.classList.contains(filterValue)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });

  // --- Load testimonials from reviews.json ---
  loadTestimonials();
});

// Inline review data from reviews.json — avoids CORS issues when
// the page is opened directly from disk (file://).
const INLINE_REVIEWS = [
  {
    username: "apptrip",
    value: 5,
    comment:
      "Working with Wildan on Fiverr was an excellent experience from start to finish. If you're looking for someone capable of handling complex and highly technical scraping tasks, Wildan is definitely the person you should consider.",
    reviewer_country: "Malaysia",
    created_at: "2026-03-17T15:54:54",
    user_image_url:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/2d5d85ab30bf8e5112ffe90630c20959-1116778931774807545.334887/535A6163-448F-4FA3-9570-EBB045D2F6D9",
  },
  {
    username: "josephballar",
    value: 5,
    comment:
      "Incredibly happy with this order. Details were descriptive and he gathered as much info as possible. Excited for the future to develop strategies to get warmer leads. Def will be booking again.",
    reviewer_country: "United States",
    created_at: "2026-05-19T00:40:56",
    user_image_url: "",
  },
  {
    username: "fennec14",
    value: 5,
    comment:
      "Muhamad did a great job getting tons of data in a very short amount of time. He was very responsive and understood exactly what I was looking for. I highly recommend working with him.",
    reviewer_country: "United States",
    created_at: "2026-04-29T23:20:47",
    user_image_url: "",
  },
  {
    username: "modish_analytic",
    value: 5,
    comment:
      "Delivered a dataset on a specific topic of interest by scrapping twitter.",
    reviewer_country: "United States",
    created_at: "2026-04-05T02:02:01",
    user_image_url:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/0f6e3d2866c12a1fc823953bc31b894d-1735342786516/86cdd446-43d4-4c8e-990d-7bf4ce875fa2.jpeg",
  },
  {
    username: "janklostermann",
    value: 5,
    comment:
      "Everything was perfect, 100% recommendation.",
    reviewer_country: "Germany",
    created_at: "2026-03-27T14:54:42",
    user_image_url: "",
  },
];


// Load testimonials — tries reviews.json first (HTTP server),
// falls back to inline data (file:// or network errors).
function loadTestimonials() {
  const grid = document.getElementById("testiGrid");
  if (!grid) return;

  fetch("reviews.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load reviews.json");
      return response.json();
    })
    .then((data) => {
      const reviews = data.reviews || [];
      renderTestimonials(grid, reviews);
    })
    .catch(() => {
      // file:// or network error — use inline fallback
      renderTestimonials(grid, INLINE_REVIEWS);
    });
}

// Render an array of review objects into the grid element.
function renderTestimonials(grid, reviews) {
  grid.innerHTML = "";

  reviews.forEach((review) => {
    const card = buildTestiCard(review);
    grid.appendChild(card);
  });
}

// Build a single testimonial card element from a review object.
function buildTestiCard(review) {
  const card = document.createElement("div");
  card.className = "testi-card";

  // Avatar — fallback to placeholder if user_image_url is missing
  const avatarUrl =
    review.user_image_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(review.username)}&background=6366f1&color=fff&size=96`;

  const img = document.createElement("img");
  img.src = avatarUrl;
  img.alt = review.username;
  img.loading = "lazy";

  // Content wrapper
  const content = document.createElement("div");
  content.className = "testi-content";

  // Review text — truncate long comments
  const text = document.createElement("p");
  const maxLen = 200;
  const fullComment = review.comment || "";
  text.textContent =
    fullComment.length > maxLen
      ? fullComment.substring(0, maxLen) + "…"
      : fullComment;

  // Stars
  const stars = document.createElement("div");
  stars.className = "stars";
  stars.textContent = renderStars(review.value);

  // Meta: username + country + date
  const meta = document.createElement("div");
  meta.className = "testi-meta";

  const nameEl = document.createElement("span");
  nameEl.className = "testi-name";
  nameEl.textContent = review.username;

  const details = document.createElement("span");
  details.className = "testi-details";
  const dateStr = review.created_at
    ? new Date(review.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  details.textContent = [review.reviewer_country, dateStr]
    .filter(Boolean)
    .join(" · ");

  meta.appendChild(nameEl);
  meta.appendChild(details);

  // Assemble
  content.appendChild(text);
  content.appendChild(stars);
  content.appendChild(meta);
  card.appendChild(img);
  card.appendChild(content);

  return card;
}


// Convert numeric rating (1-5) into star characters.
function renderStars(value) {
  const rating = Math.min(5, Math.max(0, Math.round(value || 0)));
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}
