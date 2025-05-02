document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");
  const mobileMenu = document.getElementById("navbar-default");
  const nav = document.getElementById("navbar");
  const inner = document.getElementById("inner");
  toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      toggleButton.setAttribute("aria-expanded", !isExpanded);

      // Toggle multiple classes
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("opacity-0");  // Example of another class to toggle
      mobileMenu.classList.toggle("transition-all"); // Smooth transition
      inner.classList.toggle("pb-[19px]");
      nav.classList.toggle("h-auto");
      nav.classList.toggle("bg-black/25");
      nav.classList.toggle("bg-transparent");
      nav.classList.toggle("backdrop-blur-lg"); // Example of adding/removing a background color
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  if (!navbar) {
      console.error("Navbar element not found! Make sure #navbar exists in the DOM.");
      return;
  }

  function updateNavbar() {
      console.log("Window Width:", window.innerWidth); // Debugging log

      if (window.innerWidth > 1024 ) {
          if (window.scrollY > 100) {
              navbar.classList.add("backdrop-blur-lg", "bg-black/25");
          } else {
              navbar.classList.remove("backdrop-blur-lg", "bg-black/25");
          }
      } else {
          navbar.classList.remove("backdrop-blur-lg", "bg-black/25");
      }
  }

  window.addEventListener("scroll", updateNavbar);
  window.addEventListener("resize", updateNavbar);
  updateNavbar(); // Run once on page load
});




/*=======input character count===========*/

document.addEventListener('DOMContentLoaded', function () {
    // Get the textarea and the paragraph for displaying the character count
    const textarea = document.getElementById('user-input');
    const characterCountParagraph = document.getElementById('character-count-paragraph');
    const maxLength = 50; // Set the maximum character limit
  
    // Event listener for when the user types in the textarea
    textarea.addEventListener('input', function () {
      // If the current input exceeds the max length, truncate it
      if (textarea.value.length > maxLength) {
        textarea.value = textarea.value.substring(0, maxLength);
      }
  
      // Update the paragraph with the current character count
      const currentLength = textarea.value.length;
      characterCountParagraph.textContent = `${currentLength} / ${maxLength}`;
    });
  });
  

//==================Modal=====================//
const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modalTrigger");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const CloseButtons = document.querySelectorAll(".close-btn");
const overlay = document.querySelector(".overlay-modal");

modalTriggerButtons.forEach(elem => {
    elem.addEventListener("click", event => {
        const targetModalId = event.currentTarget.getAttribute("data-modal-target");

        // Close all modals before opening the target modal
        modals.forEach(modal => {
            if (modal.id !== targetModalId) {
                closeModal(modal.id, false); // Close without hiding the overlay
            }
        });

        toggleModal(targetModalId);

        // Show the overlay
        overlay.style.opacity = "1";
        overlay.style.zIndex = "200";
        overlay.style.visibility = "visible";
        overlay.style.transition = "opacity 0.3s ease"; // Optional transition
    });
});

modalCloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals(); // Close all modals and hide overlay
    });
});

CloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals(); // Close all modals and hide overlay
    });
});

modals.forEach(elem => {
    elem.addEventListener("click", event => {
        if (event.currentTarget === event.target) closeModal(event.currentTarget.id, true);
    });
});

// Close Modal with "Esc" key
document.addEventListener("keydown", event => {
    if (event.key === "Escape" || event.keyCode === 27) {
        closeAllModals(); // Close all modals and hide overlay
    }
});

// Helper Functions

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);

    if (getComputedStyle(modal).display === "flex") {
        closeModal(modalId, true);
    } else {
        modal.style.display = "flex";
        modal.classList.add("modal-show");
    }
}

function closeModal(modalId, hideOverlay = true) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.add("modal-hide");
        setTimeout(() => {
            modal.classList.remove("modal-show", "modal-hide");
            modal.style.display = "none";
        }, 200);
    }

    // Hide overlay if specified
    if (hideOverlay) {
        overlay.style.opacity = "0";
        overlay.style.zIndex = "-1";
        overlay.style.visibility = "hidden";
        overlay.style.transition = "opacity 0.3s ease"; // Optional transition
    }
}

function closeAllModals() {
    modals.forEach(modal => closeModal(modal.id, true));
}
/*========dropdown=========*/
document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");
  const submenuButtons = document.querySelectorAll(".submenu-btn");
  const submenus = document.querySelectorAll(".submenu");
  const closeDropdowns = document.querySelectorAll(".close-dropdown");
  const closeSubmenus = document.querySelectorAll(".close-submenu");
  const dropoverlay = document.getElementById("drop-overlay");

  // Function to show a menu
  function showMenu(menu) {
      setDropdownPosition(menu);
      menu.classList.remove("opacity-0", "invisible", "translate-y-[-10px]");
      menu.classList.add("opacity-100", "translate-y-0");
  }

  // Function to hide a menu
  function hideMenu(menu) {
      menu.classList.remove("opacity-100", "translate-y-0");
      menu.classList.add("opacity-0", "translate-y-[-10px]");
      setTimeout(() => {
          menu.classList.add("invisible");
          
      }, 300);
  }

  // Set position of dropdown
  function setDropdownPosition(menu) {
      const placement = menu.getAttribute("data-placement");
      menu.style.left = "";
      menu.style.right = "";
      menu.style.top = "";
      menu.style.bottom = "";

      if (placement) {
          if (placement.includes("right")) {
              menu.style.left = "100%";
          } else if (placement.includes("left")) {
              menu.style.right = "100%";
          } else if (placement.includes("top")) {
              menu.style.bottom = "100%";
          } else if (placement.includes("bottom")) {
              menu.style.top = "100%";
          }
      }
  }

  // Show the overlay
  function showOverlay() {
      dropoverlay.classList.remove("hidden");
  }

  // Hide the overlay if all dropdowns and submenus are invisible
  function hideOverlay() {
      const allMenusInvisible = Array.from(dropdownMenus).every(menu => menu.classList.contains("invisible"));
      const allSubmenusInvisible = Array.from(submenus).every(submenu => submenu.classList.contains("invisible"));

      if (allMenusInvisible && allSubmenusInvisible) {
          dropoverlay.classList.add("hidden");
      }
  }

  // Toggle main dropdowns
  dropdownBtns.forEach((btn, index) => {
      const dropdownMenu = dropdownMenus[index];

      btn.addEventListener("click", function (e) {
          e.stopPropagation();
          // Close other dropdowns
          dropdownMenus.forEach(menu => {
              if (menu !== dropdownMenu) hideMenu(menu);
          });

          // Toggle the clicked dropdown
          if (dropdownMenu.classList.contains("invisible")) {
              showMenu(dropdownMenu);
              showOverlay();
          } else {
              hideMenu(dropdownMenu);
          }

          // After toggling, check if overlay should be hidden
          hideOverlay();
      });
  });

  // Toggle submenus
  submenuButtons.forEach(button => {
      button.addEventListener("click", function (e) {
          e.stopPropagation();
          const submenu = this.nextElementSibling;
          const parentDropdown = this.closest(".dropdown-menu");
          const siblingSubmenus = parentDropdown.querySelectorAll(".submenu");

          siblingSubmenus.forEach(sub => {
              if (sub !== submenu) hideMenu(sub);
          });

          if (submenu.classList.contains("invisible")) {
              showMenu(submenu);
              showOverlay();
          } else {
              hideMenu(submenu);
          }

          // After toggling, check if overlay should be hidden
          hideOverlay();
      });
  });

  // Close dropdown on close button click
  closeDropdowns.forEach(button => {
      button.addEventListener("click", function (e) {
          e.stopPropagation();
          const dropdownMenu = this.closest(".dropdown-menu");
          hideMenu(dropdownMenu);
          hideOverlay();
          dropoverlay.classList.add("hidden");
          
      });
  });

  // Close submenu on close button click
  closeSubmenus.forEach(button => {
      button.addEventListener("click", function (e) {
          e.stopPropagation();
          const submenu = this.closest(".submenu");
          hideMenu(submenu);
          hideOverlay();
      });
  });

  // Close all dropdowns and submenus when clicking outside
  document.addEventListener("click", function (e) {
      dropdownMenus.forEach(menu => {
          if (!menu.contains(e.target)) hideMenu(menu);
      });
      submenus.forEach(submenu => hideMenu(submenu));
      hideOverlay();  // Check if overlay should be hidden
      dropoverlay.classList.add("hidden");
  });
});


/*=====aspect ratio button active========*/
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".aspect-ratio button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove "active" class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));

            // Add "active" class to the clicked button
            this.classList.add("active");
        });
    });
});
/*=====number of image increse decrese========*/

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".minus").forEach(function (btn) {
      btn.addEventListener("click", function () {
          var input = this.parentElement.querySelector("input");
          var count = parseInt(input.value) - 1;
          input.value = count < 1 ? 1 : count;
          input.dispatchEvent(new Event("change"));
      });
  });

  document.querySelectorAll(".plus").forEach(function (btn) {
      btn.addEventListener("click", function () {
          var input = this.parentElement.querySelector("input");
          input.value = parseInt(input.value) + 1;
          input.dispatchEvent(new Event("change"));
      });
  });
});
/*=========accordion======*/
document.addEventListener('DOMContentLoaded', () => {
  const defaultAccordionGroups = document.querySelectorAll('.accordion-group[data-accordion="default-accordion"]');
  const alwaysOpenAccordionGroup = document.querySelector('.accordion-group[data-accordion="always-open-accordion"]');

  if (defaultAccordionGroups) {
      defaultAccordion(defaultAccordionGroups);
  }
  if (alwaysOpenAccordionGroup) {
      alwaysOpenAccordion(alwaysOpenAccordionGroup);
  }

});


function defaultAccordion(defaultAccordionGroups) {
  defaultAccordionGroups.forEach(defaultAccordionGroup => {
      const accordionButtons = defaultAccordionGroup.querySelectorAll('.accordion-toggle');
      accordionButtons.forEach(button => {
          button.addEventListener('click', () => {
              const accordion = button.parentElement;
              const content = button.nextElementSibling;
              const isOpen = content.style.maxHeight !== '';

              if (isOpen) {
                  close(button);
                  content.style.maxHeight = '';
                  accordion.classList.remove('active');
              } else {
                  content.style.maxHeight = content.scrollHeight + 'px';
                  accordion.classList.add('active');
                  accordionButtons.forEach(otherButton => {
                      if (otherButton !== button) {
                          const otherAccordion = otherButton.parentElement;
                          otherAccordion.classList.remove('active');
                          close(otherButton);
                      }
                  });
              }
          });
      });
  });
}

function close(element, accordion) {
  const content = element.nextElementSibling;
  content.style.maxHeight = '';
}
function alwaysOpenAccordion(alwaysOpenAccordionGroup) {
  const accordionButtons = alwaysOpenAccordionGroup.querySelectorAll('.accordion-toggle');
  console.log(accordionButtons.length);
  // var acc = document.getElementsByClassName("acc");
  var i;

  for (i = 0; i < accordionButtons.length; i++) {
      accordionButtons[i].addEventListener("click", function () {
          this.parentElement.classList.toggle("active");
          var acc_panel = this.nextElementSibling;

          if (acc_panel.style.maxHeight) {
              acc_panel.style.maxHeight = '';
          } else {
              acc_panel.style.maxHeight = acc_panel.scrollHeight + "px";
          }
      });
  }
}
/*============images change on click==========*/

document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.querySelector(".main-image");
  const thumbnailsContainer = document.querySelector(".max-w-sm");

  thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", function () {
          // Change main image source
          mainImage.src = this.querySelector("img").src;

          // Remove active border from all thumbnails
          thumbnails.forEach(thumb => thumb.classList.remove("border-blue-500"));

          // Add active border to clicked thumbnail
          this.classList.add("border-blue-500");

          // Scroll the active button to the center
          this.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      });
  });

  // Set first thumbnail as active on load
  if (thumbnails.length > 0) {
      thumbnails[0].classList.add("border-blue-500");
      mainImage.src = thumbnails[0].querySelector("img").src;
  }
});

// Select all the radio buttons in the group
document.addEventListener('DOMContentLoaded', function() {
  // Get all the buttons with the aspect-square class (your radio buttons)
  const radioButtons = document.querySelectorAll('.aspect-square');

  // Iterate over each radio button and add event listeners
  radioButtons.forEach(button => {
      button.addEventListener('click', function() {
          // If the clicked button is already checked, do nothing
          if (button.getAttribute('aria-checked') === 'true') return;

          // Uncheck all radio buttons and reset data-state & aria-checked
          radioButtons.forEach(radio => {
              radio.setAttribute('aria-checked', 'false');
              radio.setAttribute('data-state', 'unchecked');
          });

          // Check the clicked radio button
          button.setAttribute('aria-checked', 'true');
          button.setAttribute('data-state', 'checked');
      });
  });
});
/*=======range slider==========*/
  // Initialize the range slider and update the display dynamically
  $(document).ready(function() {
    // Initialize the range slider
    $('#downPayment').rangeslider({
      polyfill: false,
      onSlide: function(position, value) {
        // Update the display with the slider's value
        $('#sliderValue').text(value.toLocaleString());
      }
    });
  });