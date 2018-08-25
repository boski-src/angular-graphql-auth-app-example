import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth';
import { RepositoryService } from './repositories/repository.service';
import { UserService } from './services/user';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [AuthService, UserService, RepositoryService]
})
export class CoreModule {}
