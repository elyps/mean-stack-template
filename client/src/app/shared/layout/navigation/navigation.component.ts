import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title = "bastian-fischer.dev"

  constructor(private tokenStorageService: TokenStorageService) { }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.href = '.';
  }
}
