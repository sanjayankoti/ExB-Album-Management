import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { AppSettings } from '../app-settings';
import { UserModel } from '../shared/model/user-model';
import { isArray } from 'util';
import { SharedDataService } from '../shared/shared-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userList = new Array<UserModel>();
  public selectedUser: UserModel = new UserModel();

  constructor(private httpService: HttpService, private sharedDataService: SharedDataService) {
    this.httpService.get(AppSettings.API_ENDPOINT_URL + AppSettings.GET_USERS_LIST_SERVICE).subscribe(users => {
      if (isArray(users)) {
        users.forEach((val) => {
          let userModel = new UserModel();
          userModel.userid = val.id;
          userModel.name = val.name;
          userModel.username = val.username;
          userModel.email = val.email;
          userModel.photo = './assets/user.jpg';
          this.userList.push(userModel);
        });
      }
    }, (error => {
      throw error;
    }));
  }

  public doUserSelect(event: Event, selectedUser: UserModel) {
    this.selectedUser = selectedUser;
    this.sharedDataService.setSelectedUser(selectedUser);
  }

  public ngOnInit() {
  }
}
