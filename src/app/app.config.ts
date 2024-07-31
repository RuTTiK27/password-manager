import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"password-manager-1762a","appId":"1:385270151593:web:c863441cbff83dd8c7ecb8","storageBucket":"password-manager-1762a.appspot.com","apiKey":"AIzaSyAVYAB3fsYzacJmHx0RbRgM9ndQo-UEtow","authDomain":"password-manager-1762a.firebaseapp.com","messagingSenderId":"385270151593","measurementId":"G-SY680LVZGX"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
