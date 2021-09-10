import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firebase: AngularFirestore,
    private store : AngularFireStorage,) { }



    GetBanners() {
      return this.firebase.collection('Banners').valueChanges();
    }


    GetLoanCategory() {
      return this.firebase.collection('Loans').valueChanges();
    }

    getLoanList(){
      return new Promise<any>((resolve,reject) =>{
        this.firebase.collection('Loans').get().subscribe((data) => {
          let cat =  data.docs.map(element=>{
            let catnames = element.data();
            return catnames
          });
          resolve(cat)
        }, error=>{
          reject(error)
        })
      })
    }

  // get bank loan details
  public getbanklaoddetails(id): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.firebase.collection('BankLoans').doc(id).get().subscribe(async (details: any) => {
        let data = await details.data();
        /*await data.userref.get().then(function (doc) {
          data.userref = doc.data();
        });*/
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }


}
