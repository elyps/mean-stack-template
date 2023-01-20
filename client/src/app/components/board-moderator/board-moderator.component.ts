import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.scss']
})
export class BoardModeratorComponent {
  content?: string;
  currentUser: any;

  constructor(private userService: UserService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getModeratorBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
    this.currentUser = this.token.getUser();
  }

}
