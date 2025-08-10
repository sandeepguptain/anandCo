import {
  AfterViewInit,
  Component,
  ContentChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwiperContainer } from 'swiper/element/bundle';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'anandCo';
  @Input() swiperContainerId = '';
  index = 0;
  slidePerView = 1;

  @ContentChild('swiper') swiperRef!: ElementRef<SwiperContainer>;
  initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // if (isPlatformBrowser(this.platformId)) {
    //   // Code that uses `document` should be placed here
    //   setTimeout(() => {
    //     const element = document.getElementById('someElementId');
    //     if (element) {
    //       element.style.color = 'red';
    //     }
    //   }, 1000);
    // }
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Code that uses `document` should be placed here
     setTimeout(() => {
      const shadowRoot = document
        .getElementById(this.swiperContainerId)
        ?.getElementsByClassName('swiper')[0]?.shadowRoot
        ?.firstChild as HTMLElement;
      shadowRoot.style.paddingBottom = '35px';
    }, 300);
    }
    
   
  }

  changeSlide(prevOrNext: number): void {
    if (prevOrNext === -1) {
      this.swiperRef.nativeElement.swiper.slidePrev();
    } else {
      this.swiperRef.nativeElement.swiper.slideNext();
    }
  }
}
