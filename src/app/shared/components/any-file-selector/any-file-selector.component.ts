import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-any-file-selector',
  templateUrl: './any-file-selector.component.html',
  styleUrls: ['./any-file-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AnyFileSelectorComponent,
      multi: true,
    },
  ],
})
export class AnyFileSelectorComponent implements ControlValueAccessor, OnInit {
  // Why using ! after variable ->
  // https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc
  /**
   * Array con los formatos aceptados
   */
  @Input() fileTypesAccepted!: Array<string>;
  /**
   * String que contenga los formatos para que el cliente entienda
   */
  @Input() fileTypesMessageOnError!: string;
  /**
   * Variable que contiene los tipos de archivos separados por comas para el accept en el HTML
   */
  fileTypesAcceptedHTML = '';

  isLoading = false;
  public file: any | null = null;
  file_props: File | null = null;

  isDisabled!: boolean;
  onTouch = () => {};
  onChange = (_: any) => {};

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private _renderer: Renderer2
  ) {}

  ngOnInit() {
    this.fileTypesAcceptedHTML = this.fileTypesAccepted.join(', ');
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    console.log(file);
    // Si llega undefined o null
    if (file == undefined || file == null) {
      this.onChange(file);
      this.file = null;
    } else {
      // Si llega algo diferente a null y undefined se valida que sea una imagen
      if (this.fileTypeValidation(file)) {
        if (this.sizeValidation(file.size)) {
          this.onChange(file);
          this.file = file;
        } else {
          // this._swal.showErrorNotification('Debe ser menor a 3MB');
          this.file = null;
        }
      } else {
        // this._swal.showErrorNotification(`Sólo se aceptan ${this.fileTypesMessageOnError}`);
      }
    }
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  fileTypeValidation(file: File) {
    // Si la PC no tiene instalado Office, es posible que los archivos no tengan type
    if (file.type.length > 0) {
      console.log('Con type');
      const selectedFileType: Array<string> = [file.type];
      const foundFileType = this.fileTypesAccepted.some(
        (r) => selectedFileType.indexOf(r) >= 0
      );
      if (foundFileType) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log('Sin type');
      if (!this.extensionValidation(file.name)) {
        return false;
      } else {
        return true;
      }
    }
  }

  extensionValidation(fileName: string) {
    return new RegExp(
      '(' + this.fileTypesAccepted.join('|').replace(/\./g, '\\.') + ')$'
    ).test(fileName);
  }

  sizeValidation(fileSize: number) {
    // 3 MB
    const maxSizeInBytes = 3e6;
    if (fileSize > maxSizeInBytes) {
      return false;
    }
    return true;
  }
}
