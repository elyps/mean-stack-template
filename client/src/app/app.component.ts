import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, HostBinding, isDevMode } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;
  title = "< app-template >"
  tagArr = document.getElementsByTagName("input");
  durationInSeconds = 5;

  constructor(private tokenStorageService: TokenStorageService, private _snackBar: MatSnackBar, private overlay: OverlayContainer) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';

  ngOnInit(): void {
    if (isDevMode()) {
      console.log('Development!');
    } else {
      console.log('Production!');
    }

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';

      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
        localStorage.setItem('darkMode', 'true');
        // this.openSnackBar('Dark Mode Activated!','Close');
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
        localStorage.removeItem('darkMode');
        // this.openSnackBar('Light Mode Activated!','Close');
      }
    });
    const ls = localStorage.getItem('darkMode');
    if (ls) {
      this.overlay.getContainerElement().classList.add('darkMode');
      this.toggleControl.setValue(true);
    } else {
      this.overlay.getContainerElement().classList.remove('darkMode');
    }

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }

    // Disable autocomplete on all input fields
    for (let i = 0; i < this.tagArr.length; i++) {
      this.tagArr[i].autocomplete = 'off';
    }

  }

  logout(): void {
    this.openSnackBar('Logout successfull! Goodbye.','')
    this.tokenStorageService.signOut();
    setTimeout(function() { window.location.href = './'; }, 1000);
  }



}
