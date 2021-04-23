import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private _user: UserService) {}

  ngOnInit(): void {}

  // Logout
  userSignOut() {
    this._user.signOut();
  }
}
