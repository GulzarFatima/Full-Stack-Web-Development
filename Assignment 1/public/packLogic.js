function showStickerInputs() {
    const num = document.getElementById('numStickers').value;
    const container = document.getElementById('stickerInputs');
    container.innerHTML = "";
    
    for (let i = 1; i <= num; i++) {

      const label = document.createElement('label');
      label.textContent = "Sticker " + i + ":";
      const select = document.createElement('select');
      select.name = "stickers[]";
      select.required = true;
  
      const stickerData = window.stickerData || [];
      const placeholder = document.createElement('option');
      placeholder.value = "";
      placeholder.textContent = "Select a sticker";
      select.appendChild(placeholder);
  
      stickerData.forEach(s => {

        const opt = document.createElement('option');
        opt.value = s._id;
        opt.textContent = s.name;
        select.appendChild(opt);

      });
  
      container.appendChild(label);
      container.appendChild(select);
    }
  }
  document.addEventListener('DOMContentLoaded', function () {

    const deleteButtons = document.querySelectorAll('button.delete-button');

    deleteButtons.forEach((button) => {

      button.addEventListener('click', function (e) {

        if (!confirm('Are you sure you want to delete this sticker pack?')) {
          e.preventDefault(); 

        }
      });
    });
  });
  
  