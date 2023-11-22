import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from 'src/app/modules/cars/model/carro.model';
import { CarsService } from 'src/app/modules/cars/services/cars.service';
import { BaseResourcesListComponent } from 'src/app/shared/components/base-resources-list.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent
  extends BaseResourcesListComponent<Carro>
  implements OnInit
{
  images = [
    {
      src: 'https://www.supercars.net/blog/wp-content/uploads/2020/09/wallpaperflare.com_wallpaper-1-1.jpg',
    },

    {
      src: 'https://wallpapercrafter.com/desktop/5725-car-sports-car-neon-backlight-asphalt-4k.jpg',
    },

    {
      src: 'https://www.hdwallpapers.in/download/red_lamborghini_countach_car_dark_background_4k_5k_hd_cars-3840x2160.jpg',
    },
  ];

  constructor(config: NgbCarouselConfig, private carrosService: CarsService) {
    super(carrosService);
    config.interval = 3500;

    config.keyboard = true;

    config.pauseOnHover = true;

    config.showNavigationIndicators = false;
  }

  ngOnInit() {
    this.getAllCarros();
  }

  getAllCarros() {
    this.getAllResources();
  }
}
