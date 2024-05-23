import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Auction {
  objectName: string;
  description: string;
  categories: string[];
  startDate: string;
  endDate: string;
  startBid: number;
  img: File | null;
}

@Component({
  selector: 'auction-creator',
  templateUrl: './auction-creator.component.html',
  styleUrls: ['./auction-creator.component.scss'],
})
export class AuctionCreatorComponent {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  public auction: Auction = {
    objectName: '',
    description: '',
    categories: [],
    startDate: '',
    endDate: '',
    startBid: 0,
    img: null,
  };
  public categories: string[] = ['Category 1', 'Category 2', 'Category 3']; // Define las categorías disponibles
  public selectedCategories: { [key: string]: boolean } = {};

  public imageSrc: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient) { }
  
  getCurrentDateTime(): string {
    return new Date().toISOString().slice(0, 16);

    // Retorna la fecha y hora actual en formato 'YYYY-MM-DDTHH:MM'
  }
  isEndDateValid(): boolean {
    const selectedDate = new Date(this.auction.endDate);
    const currentDate = new Date();
    return selectedDate >= currentDate;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setDropAreaStyle(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setDropAreaStyle(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setDropAreaStyle(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.loadFile(files[0]);
    }
  }

  onClick() {
    this.fileInput?.nativeElement.click();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadFile(file);
    }
  }

  loadFile(file: File) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.auction.img = file;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, carga solo imágenes');
    }
  }

  onSubmit() {
    this.auction.categories = Object.keys(this.selectedCategories).filter(
      (category) => this.selectedCategories[category]
    );
    const formData = new FormData();
    formData.append('objectName', this.auction.objectName);
    formData.append('description', this.auction.description);
    formData.append('categories', this.auction.categories.join(','));
    formData.append('startDate', new Date().toISOString());
    formData.append('endDate', this.auction.endDate);
    formData.append('startBid', new Date(this.auction.startBid).toISOString());
    if (this.auction.img) {
      formData.append('img', this.auction.img);
    }
    const formDataObject : any = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    console.log(formDataObject);

    /*  this.http.post('URL_DEL_BACKEND/guardarSubasta', formData).subscribe(response => {
      console.log('Subasta guardada', response);
    }); */
  }

  private setDropAreaStyle(isDragOver: boolean) {
    const dropArea = document.querySelector('.file-drop');
    if (dropArea) {
      if (isDragOver) {
        dropArea.classList.add('drag-over');
      } else {
        dropArea.classList.remove('drag-over');
      }
    }
  }
}
