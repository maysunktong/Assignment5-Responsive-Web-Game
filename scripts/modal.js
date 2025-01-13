
const modalOverlay = document.querySelector('.modal-overlay');
const closeModalBtn = document.querySelector(".modal-close")

export function showModal() {
  modalOverlay.style.display = 'block';
}

// Function to hide the modal
function hideModal() {
  modalOverlay.style.display = 'none';
  window.location.href = '/index.html';
}

// Attach close button functionality
closeModalBtn.addEventListener('click', hideModal);

// Close modal when clicking outside the modal content
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    hideModal();
  }
});
