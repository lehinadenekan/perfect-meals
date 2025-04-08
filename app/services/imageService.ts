import { createHash } from 'crypto';
import { writeFile, mkdir, copyFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export class ImageService {
  private readonly imageStoragePath: string;
  private readonly placeholderPath: string;
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000; // 1 second
  
  constructor() {
    // Store images in a public directory
    this.imageStoragePath = join(process.cwd(), 'public', 'recipe-images');
    this.placeholderPath = join(process.cwd(), 'public', 'placeholder-recipe.jpg');
    this.ensureStorageDirectory();
  }

  private async ensureStorageDirectory() {
    if (!existsSync(this.imageStoragePath)) {
      await mkdir(this.imageStoragePath, { recursive: true });
      console.log(`Created directory: ${this.imageStoragePath}`);
    }
  }

  private generateImageFileName(url: string): string {
    // Create a hash of the URL to use as filename
    const hash = createHash('md5').update(url).digest('hex');
    return `${hash}.jpg`;
  }

  public getLocalImagePath(fileName: string): string {
    return `/recipe-images/${fileName}`;
  }

  private async copyPlaceholderImage(fileName: string): Promise<string> {
    try {
      const targetPath = join(this.imageStoragePath, fileName);
      if (existsSync(this.placeholderPath)) {
        await copyFile(this.placeholderPath, targetPath);
        return this.getLocalImagePath(fileName);
      }
      console.log('Placeholder image not found, creating a default one');
      // If no placeholder exists, create a simple one with text
      const defaultPlaceholder = Buffer.from('Recipe Image Not Available');
      await writeFile(targetPath, defaultPlaceholder);
      return this.getLocalImagePath(fileName);
    } catch (error) {
      console.error('Error copying placeholder image:', error);
      return '/placeholder-recipe.jpg';
    }
  }

  private async attemptDownload(url: string, attempt: number = 1): Promise<Response | null> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RecipeAppImageCrawler/1.0)'
        }
      });
      
      if (response.ok) return response;
      
      if (attempt < this.maxRetries && response.status !== 404) {
        console.log(`Retry ${attempt} for ${url}`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        return this.attemptDownload(url, attempt + 1);
      }
      
      return null;
    } catch {
      if (attempt < this.maxRetries) {
        console.log(`Retry ${attempt} after error for ${url}`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        return this.attemptDownload(url, attempt + 1);
      }
      return null;
    }
  }

  public async downloadAndStoreImage(imageUrl: string, recipeName?: string): Promise<string> {
    try {
      // Skip if URL is already local or null/empty
      if (!imageUrl || imageUrl.startsWith('/recipe-images/') || imageUrl.startsWith('/placeholder')) {
        console.log(`Image URL is already local or invalid: ${imageUrl}`);
        return imageUrl || '/placeholder-recipe.jpg';
      }

      console.log(`Attempting to download image for ${recipeName || 'recipe'} from: ${imageUrl}`);

      // Ensure URL is properly formatted
      let formattedUrl = imageUrl;
      if (!formattedUrl.startsWith('http')) {
        formattedUrl = `https:${formattedUrl}`;
      }

      // Generate a unique filename
      const fileName = this.generateImageFileName(formattedUrl);
      const filePath = join(this.imageStoragePath, fileName);

      // Check if we already have this image
      if (existsSync(filePath)) {
        console.log(`Image already exists locally: ${fileName}`);
        return this.getLocalImagePath(fileName);
      }

      // Attempt download with retries
      const response = await this.attemptDownload(formattedUrl);
      
      if (!response) {
        console.log(`Failed to download image after retries, using placeholder for: ${recipeName || imageUrl}`);
        return this.copyPlaceholderImage(fileName);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.startsWith('image/')) {
        console.error(`URL does not point to an image: ${formattedUrl}, Content-Type: ${contentType}`);
        return this.copyPlaceholderImage(fileName);
      }

      // Convert to buffer and save
      const buffer = await response.arrayBuffer();
      await writeFile(filePath, Buffer.from(buffer));
      console.log(`Successfully saved image to: ${filePath}`);

      // Return the public URL
      return this.getLocalImagePath(fileName);
    } catch {
      console.error(`Error processing image from ${imageUrl}`);
      return this.copyPlaceholderImage(this.generateImageFileName(imageUrl));
    }
  }
}

const imageServiceInstance = new ImageService();
export default imageServiceInstance; 