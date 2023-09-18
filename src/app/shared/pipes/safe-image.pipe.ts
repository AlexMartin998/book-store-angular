import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeImage',
})
export class SafeImagePipe implements PipeTransform {
  private readonly baseUrl: string = 'http://localhost:3000/api/v1';

  transform(imageUrl: string): string {
    if (!imageUrl) return 'assets/no-image.png';

    if (imageUrl.includes('cloudinary') || imageUrl.includes('https'))
      return imageUrl;

    return `${this.baseUrl}/home/files/${imageUrl}`;
  }
}
