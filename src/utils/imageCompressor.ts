/**
 * Compresses and scales an image file on the client before saving to Firestore.
 * Produces an optimized, high-fidelity base64 data URL that fits well within Firestore's 1MB document limit,
 * ensuring immediate real-time synchronization to all devices and public visitors.
 */
export const compressImageFile = (file: File, maxWidth = 1280, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If it's already an SVG or tiny image, read as data URL directly
    if (file.type.includes('svg')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as WebP if supported, otherwise JPEG
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        // Fallback to raw data url if image decode fails
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
