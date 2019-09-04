import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';

@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    constructor(private router: RouterExtensions) {
    }

    ngOnInit() {

    }

    onSignin() {
        this.router.navigate(['today'], {clearHistory: true});
    }

}
