export interface DetectionResult {
    found: boolean;
    x: number;
    y: number;
    confidence: number;
}

export class ImageDetection {
    private templateImage: HTMLImageElement | null = null;
    private templateCanvas: HTMLCanvasElement;
    private templateCtx: CanvasRenderingContext2D;
    private isLoaded = false;

    constructor() {
        this.templateCanvas = document.createElement('canvas');
        this.templateCtx = this.templateCanvas.getContext('2d')!;
    }

    public isTemplateLoaded(): boolean {
        return this.isLoaded;
    }

    /**
     * Load the template image to search for
     */
    public async loadTemplate(imagePath: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.templateImage = img;
                this.templateCanvas.width = img.width;
                this.templateCanvas.height = img.height;
                this.templateCtx.drawImage(img, 0, 0);
                this.isLoaded = true;
                console.log(`Template loaded: ${img.width}x${img.height}`);
                resolve(true);
            };
            img.onerror = (err) => {
                console.error('Failed to load template image:', err);
                reject(false);
            };
            img.src = imagePath;
        });
    }

    /**
     * Detect the template image in the game canvas
     */
    public detectInCanvas(gameCanvas: HTMLCanvasElement, threshold = 0.8): DetectionResult {
        if (!this.isLoaded || !this.templateImage) {
            console.error('Template not loaded!');
            return { found: false, x: 0, y: 0, confidence: 0 };
        }

        const gameCtx = gameCanvas.getContext('2d');
        if (!gameCtx) {
            console.error('Cannot get game canvas context!');
            return { found: false, x: 0, y: 0, confidence: 0 };
        }

        const templateWidth = this.templateCanvas.width;
        const templateHeight = this.templateCanvas.height;
        const gameWidth = gameCanvas.width;
        const gameHeight = gameCanvas.height;

        console.log(`Template size: ${templateWidth}x${templateHeight}`);
        console.log(`Game canvas size: ${gameWidth}x${gameHeight}`);
        console.log(`Threshold: ${threshold}`);

        // Get template image data
        const templateData = this.templateCtx.getImageData(0, 0, templateWidth, templateHeight);
        
        // Get game canvas data
        const gameData = gameCtx.getImageData(0, 0, gameWidth, gameHeight);

        let bestMatch = { x: 0, y: 0, confidence: 0 };
        let searchCount = 0;

        // Template matching using normalized cross-correlation
        for (let y = 0; y <= gameHeight - templateHeight; y += 2) { // Step by 2 for performance
            for (let x = 0; x <= gameWidth - templateWidth; x += 2) {
                searchCount++;
                const confidence = this.calculateMatchScore(
                    gameData,
                    templateData,
                    x,
                    y,
                    gameWidth,
                    templateWidth,
                    templateHeight
                );

                if (confidence > bestMatch.confidence) {
                    bestMatch = { x: x + templateWidth / 2, y: y + templateHeight / 2, confidence };
                    console.log(`New best match at (${bestMatch.x}, ${bestMatch.y}): ${confidence.toFixed(3)}`);
                }

                // Early exit if we found a great match
                if (confidence > 0.95) {
                    console.log(`Excellent match found! Stopping search.`);
                    return { found: true, ...bestMatch };
                }
            }
        }

        console.log(`Searched ${searchCount} positions`);
        console.log(`Best confidence: ${bestMatch.confidence.toFixed(3)} (threshold: ${threshold})`);

        if (bestMatch.confidence >= threshold) {
            return { found: true, ...bestMatch };
        }

        return { found: false, x: 0, y: 0, confidence: bestMatch.confidence };
    }

    /**
     * Calculate match score between template and game region
     */
    private calculateMatchScore(
        gameData: ImageData,
        templateData: ImageData,
        offsetX: number,
        offsetY: number,
        gameWidth: number,
        templateWidth: number,
        templateHeight: number
    ): number {
        let score = 0;
        let totalPixels = 0;

        for (let ty = 0; ty < templateHeight; ty += 2) { // Sample every 2 pixels for speed
            for (let tx = 0; tx < templateWidth; tx += 2) {
                const gx = offsetX + tx;
                const gy = offsetY + ty;

                const templateIdx = (ty * templateWidth + tx) * 4;
                const gameIdx = (gy * gameWidth + gx) * 4;

                // Compare RGB values (ignore alpha)
                const rDiff = Math.abs(templateData.data[templateIdx] - gameData.data[gameIdx]);
                const gDiff = Math.abs(templateData.data[templateIdx + 1] - gameData.data[gameIdx + 1]);
                const bDiff = Math.abs(templateData.data[templateIdx + 2] - gameData.data[gameIdx + 2]);

                // Calculate similarity (255 - difference normalized to 0-1)
                const pixelSimilarity = 1 - (rDiff + gDiff + bDiff) / (255 * 3);
                score += pixelSimilarity;
                totalPixels++;
            }
        }

        return totalPixels > 0 ? score / totalPixels : 0;
    }

    /**
     * Detect using color-based method (faster but less accurate)
     */
    public detectByColor(
        gameCanvas: HTMLCanvasElement,
        targetColor: { r: number; g: number; b: number },
        tolerance = 30
    ): DetectionResult[] {
        const ctx = gameCanvas.getContext('2d');
        if (!ctx) return [];

        const imageData = ctx.getImageData(0, 0, gameCanvas.width, gameCanvas.height);
        const matches: DetectionResult[] = [];

        for (let y = 0; y < gameCanvas.height; y += 5) {
            for (let x = 0; x < gameCanvas.width; x += 5) {
                const idx = (y * gameCanvas.width + x) * 4;
                const r = imageData.data[idx];
                const g = imageData.data[idx + 1];
                const b = imageData.data[idx + 2];

                const colorDiff = Math.abs(r - targetColor.r) + 
                                Math.abs(g - targetColor.g) + 
                                Math.abs(b - targetColor.b);

                if (colorDiff < tolerance * 3) {
                    matches.push({
                        found: true,
                        x,
                        y,
                        confidence: 1 - colorDiff / (tolerance * 3)
                    });
                }
            }
        }

        return matches;
    }
}
