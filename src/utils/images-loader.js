export const loadImage = path =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = path;
    });

export const loadImages = (...paths) => Promise.all(paths.map(loadImage));
