import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnyFileSelectorComponent } from './components/any-file-selector/any-file-selector.component';
import { ShowLoadingComponent } from './components/show-loading/show-loading.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from '../icons-provider.module';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [AnyFileSelectorComponent, ShowLoadingComponent],
  imports: [CommonModule],
  exports: [
    // Components
    AnyFileSelectorComponent,
    ShowLoadingComponent,
    // ng-modules
    FormsModule,
    ReactiveFormsModule,
    // ng-zorro
    NzFormModule,
    NzCardModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzMenuModule,
    NzSpaceModule,
    NzBreadCrumbModule,
    NzUploadModule,
    NzTypographyModule,
    NzButtonModule,
    IconsProviderModule,
    NzDatePickerModule,
    NzMessageModule,
    NzToolTipModule,
    NzTabsModule,
    NzPaginationModule,
    NzCollapseModule,
    NzEmptyModule,
    NzPopconfirmModule,
    NzNotificationModule,
  ],
})
export class SharedModule {}
