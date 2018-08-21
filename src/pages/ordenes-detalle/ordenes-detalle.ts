import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';

import { CarritoService } from "../../providers/carrito";

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden:any = {}

  constructor(public navCtrl: NavController,
              private alertCtrl:AlertController,
              public navParams: NavParams,
              private _cs:CarritoService ) {

    this.orden = this.navParams.get("orden");

  }

  borrar_orden( orden_id:string ){
    this.alertCtrl.create({
      title: "¿Esta seguro que quiere borrar esta orden?",
      subTitle: "Se borrarán todos los pedidos realizados",
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('No se borro la orden');
        }
      },
      {
        text: "OK",
        handler: () => {
          this._cs.borrar_orden(orden_id).subscribe(datos => {
          if(datos){
            this.alertCtrl.create({
              title: "Su orden ha sido borrada exitosamente",
              buttons: ["OK"]
            }).present().then(() => {
              this.navCtrl.pop();
            })
          }else{
            this.alertCtrl.create({
              title: "Error desconocido",
              buttons: ["OK"]
            }).present();
          }
          }, error => {
            console.log(error);
          })
        }
      }]
    }).present();
  }
}
