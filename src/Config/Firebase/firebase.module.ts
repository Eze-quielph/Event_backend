import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Module({
    providers:[
        {
            provide: 'firebaseAdmin',
            useFactory: ()=>{
                admin.initializeApp({
                    credential: admin.credential.applicationDefault(),
                    storageBucket:
                      'gs://presentacion-demo.appspot.com/',
                });
                admin.storage()
                return admin;
            }
        }
    ],
    exports: ['firebaseAdmin']
})
export class FirebaseModule{}