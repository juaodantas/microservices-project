import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContainerComponent } from './user-container/user-container.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserCreateFormComponent } from './components/user-create-form/user-create-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { UserUpdateFormComponent } from './components/user-update-form/user-update-form.component';



@NgModule({
  declarations: [UserContainerComponent, UserCreateFormComponent, UserUpdateFormComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
})
export class UserModule { }
