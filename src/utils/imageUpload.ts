/**
 * Utility for client-side image compression and cross-device server upload.
 * Ensures pictures uploaded from any phone, camera, or laptop are lightweight,
 * fast-loading, and publicly accessible from any other device or visitor.
 */

export async function compressImageFile(
  file: File,
  maxDimension: number = 1600,
  quality: number = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image element'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to lightweight JPEG data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image (either a File or base64 string) to the server so it gets
 * stored as a real public file accessible by all devices.
 * If server is unavailable, safely falls back to the compressed base64 string.
 */
export async function uploadImageToServer(
  imageSource: File | string,
  preferredName: string = 'destination'
): Promise<string> {
  let base64Data: string;

  if (typeof imageSource === 'string') {
    // If it's already an online URL, return as is
    if (
      imageSource.startsWith('http://') ||
      imageSource.startsWith('https://') ||
      imageSource.startsWith('/uploads/')
    ) {
      return imageSource;
    }
    base64Data = imageSource;
  } else {
    // Compress File first
    base64Data = await compressImageFile(imageSource);
  }

  try {
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: base64Data,
        name: preferredName
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.url) {
        return data.url;
      }
    }
  } catch (err) {
    console.warn('Could not reach upload API, using local compressed image fallback:', err);
  }

  // Graceful fallback to compressed base64
  return base64Data;
}
