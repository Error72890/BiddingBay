import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SessionGuard } from 'src/app/guards/session.guard';

@Component({
  selector: 'app-auction-creator',
  templateUrl: './auction-creator.component.html',
  styleUrls: ['./auction-creator.component.scss'],
  providers: [SessionGuard]
})
export class AuctionCreatorComponent {
  imageSrc: HTMLImageElement | ArrayBuffer | null = null; // Property for holding image source
  imageName: string | null = null; // Property for holding image name

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  readURL(input: HTMLInputElement) {
    if (input.files && input.files[0]) {
      const reader: FileReader = new FileReader();
  
      reader.onload = (e: any) => {
        this.renderer.addClass(
          this.elementRef.nativeElement.querySelector('.image-upload-wrap'),
          'd-none'
        );

        if (typeof e.target.result === 'string') {
          this.imageSrc = new Image();
          this.imageSrc.src = e.target.result;
        } else {
          this.imageSrc = e.target.result;
        }

        this.renderer.setAttribute(
          this.elementRef.nativeElement.querySelector('.file-upload-image'),
          'src',
          (this.imageSrc as HTMLImageElement).src ?? ''
        );
        this.renderer.removeClass(
          this.elementRef.nativeElement.querySelector('.file-upload-content'),
          'd-none'
        );
        this.imageName = input.files?.[0]?.name ?? ''; // Set image name
      };
  
      reader.readAsDataURL(input.files[0]);
    } else {
      this.removeUpload();
    }
  }
  
  removeUpload() {
    const fileUploadInput: HTMLElement | null = this.elementRef.nativeElement.querySelector('.file-upload-input');
    if (fileUploadInput) {
      fileUploadInput.replaceWith(fileUploadInput.cloneNode(true));
      this.renderer.addClass(
        this.elementRef.nativeElement.querySelector('.file-upload-content'),
        'd-none'
      );
      this.renderer.removeClass(
        this.elementRef.nativeElement.querySelector('.image-upload-wrap'),
        'd-none'
      );
      this.imageSrc = null; // Clear image source
      this.imageName = null; // Clear image name
    }
  }

  triggerFileInput() {
    this.elementRef.nativeElement.querySelector('.file-upload-input')?.click();
  }

  ngOnInit() {
    this.elementRef.nativeElement.querySelector('.image-upload-wrap')
      .addEventListener('dragover', () => {
        this.renderer.addClass(
          this.elementRef.nativeElement.querySelector('.image-upload-wrap'),
          'image-dropping'
        );
      });

    this.elementRef.nativeElement.querySelector('.image-upload-wrap')
      .addEventListener('dragleave', () => {
        this.renderer.removeClass(
          this.elementRef.nativeElement.querySelector('.image-upload-wrap'),
          'image-dropping'
        );
    });
  }
}