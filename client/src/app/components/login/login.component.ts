import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  tagArr = document.getElementsByTagName("input");
  durationInSeconds = 5;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

    // Disable autocomplete on all input fields
    for (let i = 0; i < this.tagArr.length; i++) {
      this.tagArr[i].autocomplete = 'off';
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.openSnackBar(`Success! You're logged in as ${this.tokenStorage.getUser().roles}`, '')
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.openSnackBar(`Login failed: ${this.errorMessage}`,'');
      }
    });
  }

  reloadPage(): void {
    setTimeout(function() { window.location.href = '/profile'; }, 2000);
  }

}
