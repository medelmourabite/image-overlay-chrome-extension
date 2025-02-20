const imageUrl = localStorage.getItem('imageUrl');
const opacity = localStorage.getItem('opacity');
const imageUrlInput = document.getElementById('image-url');
imageUrlInput.value = imageUrl;
const opacitySlider = document.getElementById('opacity-slider');
opacitySlider.value = opacity;
const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', async () => {
  const imageUrl = imageUrlInput.value;
  const opacity = opacitySlider.value;
  localStorage.setItem('imageUrl', imageUrl);
  localStorage.setItem('opacity', opacity);

  const [tab] = await chrome.tabs.query({ active: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [imageUrl, opacity],
    func: (imageUrl, opacity) => {
      document.getElementById('image-overlay')?.remove();
      const image = document.createElement('img');
      image.id = 'image-overlay';
      image.src = imageUrl;
      image.style.opacity = (+opacity || 60) / 100;
      image.style.position = 'absolute';
      image.style.top = '0';
      image.style.left = '0';
      image.style.width = '100%';
      image.style.zIndex = '10000000';
      document.body.appendChild(image);
    },
  });
});
