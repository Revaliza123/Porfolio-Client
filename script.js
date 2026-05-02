document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".port-item");
  const contactButton = document.getElementById("contactBtn");

  contactButton.addEventListener("click", function () {
    const emailTujuan = "work.muhamadwildan@email.com";

    const subject = encodeURIComponent("Freelance/Collaboration Inquiry");
    const body = encodeURIComponent(
      "Halo Wildan, saya tertarik untuk berdiskusi mengenai...",
    );

    window.location.href = `mailto:${emailTujuan}?subject=${subject}&body=${body}`;
  });

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
});
