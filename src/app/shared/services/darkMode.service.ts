import { HostBinding, Injectable, signal } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DarkModeService {
    
    darkMode = signal<boolean>(
        JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
    );

    @HostBinding('class.dark') get mode() {
        return this.darkMode();
    }

}
