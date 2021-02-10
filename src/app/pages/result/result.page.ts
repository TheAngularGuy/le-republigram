import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer') canvasContainer: ElementRef<HTMLCanvasElement>;
  ready$ = new BehaviorSubject<boolean>(false);
  destroyed$ = new Subject<boolean>();
  ctx: CanvasRenderingContext2D;

  constructor(
    private stateService: StateService,
    private navCtrl: NavController,
    private socialSharing: SocialSharing,
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const canvas = this.canvasContainer.nativeElement;
    this.ctx = canvas.getContext('2d');

    combineLatest([this.stateService.img$, this.stateService.text$]).pipe(
      tap(([img, text]) => {
        if (!img) {
          this.navCtrl.navigateBack(['accueil']);
        }
        if (!!img && !text) {
          this.navCtrl.navigateBack(['text']);
        }
      }),
      filter(([img, text]) => !!img && !!text),
      tap(([img, text]) => {
        this.drawOnCanvas(img, text);
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  private drawOnCanvas(file: File | any, { h1, h2 }: { h1: string; h2: string }) {
    if (!file) {
      return;
    }
    const canvas = this.canvasContainer.nativeElement;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const ratio = Math.max(img.width / img.height, img.height / img.width);
      canvas.width = Math.max(canvas.offsetWidth, 600);
      canvas.height = Math.max(canvas.offsetHeight, 600);
      this.ctx.drawImage(img, 0, 0, canvas.width, (canvas.width * ratio));

      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = 'start';
      this.ctx.textBaseline = 'alphabetic';

      const w = canvas.width;

      let text = h1.toUpperCase().trim(); // 16 max
      this.ctx.font = 44 + 'px "LexendMegaRegular"';
      let metric = this.ctx.measureText(text).width;
      let pading = (w - metric) / 2;
      this.ctx.fillText(text, pading, 85);

      text = (h2[0].toUpperCase() + h2.slice(1).toLowerCase()).trim(); // 20 max
      this.ctx.font = 68 * 2 + 'px "LaBeauties"';
      metric = this.ctx.measureText(text).width;
      pading = (w - metric) / 2;
      this.ctx.fillText(text, pading, 182);

      text = 'le républigram'.toUpperCase();
      this.ctx.font = 14 + 'px "LexendMegaRegular"';
      metric = this.ctx.measureText(text).width;
      pading = (w - metric);
      this.ctx.fillText(text, pading - 5, canvas.height - 5);

      /*const waterMarkImg = new Image();
       waterMarkImg.onload = () => {
       this.ctx.drawImage(waterMarkImg, 0, canvas.width - 30, 100, canvas.width);
       };
       waterMarkImg.src = 'assets/images/watermark.png';*/

      setTimeout(() => this.ready$.next(true), 1000);
    };
  }

  onDownload() {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = this.canvasContainer.nativeElement.toDataURL();
    a.download = 'LE-REPUBLIGRAM_image_' + Math.random().toString().slice(3, 8) + '.png';
    document.body.appendChild(a);
    a.click();
    requestAnimationFrame(() => document.body.removeChild(a));
  }

  share() {
    console.log('share clicked');
    const img = this.canvasContainer.nativeElement.toDataURL('image/jpeg', 1.0);
    const name = 'LE-REPUBLIGRAM_image_' + Math.random().toString().slice(3, 8) + '.png';

    this.socialSharing.share('Message and image', name, img, 'http://www.x-services.nl')
      .then(() => console.log('shared ok'))
      .catch((err) => console.error(err));

    /*
     const fileTransfer: FileTransferObject = this.transfer.create();
     fileTransfer.download(url, this.fileService.externalRootDirectory + name).then((entry) => {
     console.log('download complete: ' + entry.toURL());
     }, (err) => {
     // handle error
     console.error(err);
     });
     */
  }

  goHome() {
    this.navCtrl.navigateBack(['accueil']);
  }
}
