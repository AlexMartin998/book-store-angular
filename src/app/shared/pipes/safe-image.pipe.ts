import { Pipe, PipeTransform } from '@angular/core';

import { environment } from 'src/environments/environment';

@Pipe({
  name: 'safeImage',
})
export class SafeImagePipe implements PipeTransform {
  private readonly baseUrl: string = environment.baseUrl;

  transform(imageUrl: string): string {
    if (!imageUrl) return 'assets/no-image.png';

    if (imageUrl.includes('cloudinary') || imageUrl.includes('https'))
      return imageUrl;

    return `${this.baseUrl}/home/files/${imageUrl}`;
  }
}
