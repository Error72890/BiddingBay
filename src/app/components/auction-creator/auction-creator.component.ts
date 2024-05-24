import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageService } from 'src/app/services/api/image.service';
import { AuctionService } from 'src/app/services/api/auction.service';
import { RelationsAuctionsService } from 'src/app/services/api/relations-auctions.service';
import { Router, ActivatedRoute } from '@angular/router';


interface Auction {
  objectName: string;
  description: string;
  categories: string[];
  startDate: string;
  endDate: string;
  minBid: number;
  minBidIncrement: number;
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
    minBid: 0,
    minBidIncrement: 0,
    img: null,
  };

  private userId: number = parseInt(localStorage.getItem('userId')!)
  public categories: string[] = [
    'Libros',
    'Pinturas',
    'Esculturas',
    'Arte',
    'Antiguedades',
    'Telefonos',
    'Tablets',
    'Computadoras',
    'DispositivosElectronicos',
    'VideojuegosyConsolas',
    'RopaparaMujeres',
    'RopaparaHombres',
    'ZapatosyCalzado',
    'BolsosyCarteras',
    'Muebles',
    'Electrodomesticos',
    'DecoracióndeCasas',
    'HerramientasdeJardineria',
    'Anillos',
    'Collares',
    'Pulseras',
    'Relojes',
    'Automoviles',
    'Motocicletas',
    'PartesyAccesorios',
    'VehiculosRecreacionales',
    'JuguetesEducativos',
    'FigurasdeAccion',
    'Monedas',
    'Sellos',
    'ArticulosdeColeccion',
    'EquipodeEjercicio',
    'ArticulosDeportivos',
    'CampamentoyAventuras',
    'EquipamientoparaDeportesAcuaticos',
    'CDyVinilos',
    'InstrumentosMusicales',
    'ProduccionMusical',
    'HerramientasManuales',
    'EquipamientoIndustrial',
    'MaterialdeConstruccion',
    'EquipamientoDeSeguridad'
  ]
  public selectedCategories: { [key: string]: boolean } = {};

  public imageSrc: string | ArrayBuffer | null = null;

  constructor(
    private http: HttpClient,
    private imageService: ImageService,
    private auctionService: AuctionService,
    private relationsAuctionsService: RelationsAuctionsService,
    private router: Router,
  ) {}

  getCurrentDateTime(): string {
    return new Date().toISOString().slice(0, 16);

    // Retorna la fecha y hora actual en formato 'YYYY-MM-DDTHH:MM'
  }
  isEndDateValid(): boolean {
    const selectedDate = new Date(this.auction.endDate);
    const currentDate = new Date();
    return selectedDate >= currentDate;
  }

  isValidNumber(): boolean { 
    return this.auction.minBid >= 0 && this.auction.minBidIncrement >= 0
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
      this.hideDropArea();
    } else {
      alert('Por favor, carga solo imágenes');
    }
  }

  onSubmit() {
    this.auction.categories = Object.keys(this.selectedCategories).filter(
      (category) => this.selectedCategories[category]
    );

    let imageUrl: string = ''
    
    const {
      objectName,
      description,
      categories,
      startDate,
      endDate,
      minBid,
      minBidIncrement,
    } = this.auction;

    if (this.auction.img !== null) {
      this.imageService.saveImage(this.auction.img).subscribe({
        next: (response) => {
          imageUrl = response.imageUrl;
          this.auctionService
          .addAuction(
            objectName,
            description,
            categories.join(','),
            startDate,
            endDate,
            imageUrl,
            minBid,
            minBidIncrement
          )
          .subscribe({
            next: (response:any) => {
              let auctionId = response.auctionId;
              this.relationsAuctionsService.addAuctionRelation(response.auctionId, this.userId, true, minBid).subscribe({
                next: (response) => {
                  console.log('Relación creada con éxito:', response);
                  this.router.navigate(['/auction-details', auctionId]);

                }
              })
            },
            error: (error) => {
              console.error('Error al crear la subasta:', error);
            },
          });
          
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
        },
      });
      return;
    }
    
    this.auctionService
          .addAuction(
            objectName,
            description,
            categories.join(','),
            startDate,
            endDate,
            imageUrl,
            minBid,
            minBidIncrement
          )
          .subscribe({
            next: (response:any) => {
              let auctionId = response.auctionId;
              this.relationsAuctionsService.addAuctionRelation(response.auctionId, this.userId, true, minBid).subscribe({
                next: (response) => {
                  this.router.navigate(['/auction-details', auctionId]);

                }
              })
            },
            error: (error) => {
              console.error('Error al crear la subasta:', error);
            },
          });
  
   
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
  private hideDropArea() {
    const dropArea = document.querySelector('.file-drop');
    if (dropArea) {
      dropArea.classList.add('d-none');
    }
  }
}
