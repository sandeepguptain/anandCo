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
import { SwiperContainer } from 'swiper/element/bundle';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
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

  successMessage = '';
  errorMessage = '';
  contactForm!: FormGroup;
  showLoader = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
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

  onSubmit() {
    if (this.contactForm.invalid) return;
    this.errorMessage = '';
 this.successMessage = '';
 this.showLoader = true;
    this.http.post('/api/send-email', this.contactForm.value).subscribe({
      next: () => {
        this.successMessage = 'Your message has been sent. Thank you!';
        this.errorMessage = '';
        this.contactForm.reset();
         this.showLoader = false;
      },
      error: () => {
        this.errorMessage = 'Something went wrong. Please try again later.';
        this.successMessage = '';
         this.showLoader = false;
      },
    });
  }
}
