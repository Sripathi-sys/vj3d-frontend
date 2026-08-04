// src/utils/imageHelper.js

const BASE = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api').replace('/api', '');

/**
 * Resolves an image URL and injects Cloudinary optimizations if applicable.
 * @param {string} img - The raw image path or URL
 * @param {number} width - Maximum width for resizing (default 400)
 */
export function getImageUrl(img, width = 400) {
  if (!img) return null;
  
  // If it's a Cloudinary URL, inject dynamic compression and resizing
  if (img.startsWith('http://') || img.startsWith('https://')) {
    const optimizationParams = `w_${width},c_limit,q_auto,f_auto`;
    return img.replace('/upload/', `/upload/${optimizationParams}/`);
  }
  
  // If it's a legacy local path, serve from backend uploads folder
  if (img.startsWith('/')) {
    return `${BASE}${img}`;
  }
  return `${BASE}/${img}`;
}
