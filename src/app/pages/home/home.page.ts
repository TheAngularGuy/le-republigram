import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import {IonMenuButton, NavController, Platform} from '@ionic/angular';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(
    private platform: Platform,
    private imagePicker: ImagePicker,
    private stateService: StateService,
    private navCtrl: NavController,
  ) {
  }

  ngOnInit() {
  }

  onSelectImg() {
    if (true || this.stateService.isDesktop$.getValue()) {
      this.fileInput.nativeElement.value = null;
      this.fileInput.nativeElement.click();
      return;
    }

    // mobile
    const opt: ImagePickerOptions = {
      allow_video: false,
      quality: 1
    };
    this.imagePicker.getPictures(opt).then((results) => {
      for (const result of results) {
        console.log('Image URI: ' + result);
      }
    }, (err) => {
      console.error(err);
    });
  }

  onFileLoaded() {
    if (!this.fileInput.nativeElement.files?.length) {
      return;
    }
    const img = this.fileInput.nativeElement.files[0];
    this.stateService.img$.next(img);
    this.navCtrl.navigateForward(['text']);
  }

  toggleMenu(el: any) {
    el.el.click();
  }
}
