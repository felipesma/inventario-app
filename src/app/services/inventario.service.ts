import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionChanges,
  collectionData,
  collectionSnapshots,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { Inventario } from '../models/inventario.model';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  items$!: Observable<any[]>;

  constructor(private firestore: Firestore, private authService: AuthService) {}

  crearInventario(inventario: Inventario) {
    const uid = this.authService.user?.userId;
    const collectionInventario = collection(
      this.firestore,
      `${uid}/inventario/items`
    );
    const documentRef = doc(collectionInventario);
    return setDoc(documentRef, { ...inventario });
  }

  initIngresosEgresosListener(
    userId: string | undefined
  ): Observable<Inventario[]> {
    // Estoy retorna un array con los documentos de la colección
    return collectionSnapshots(
      collection(this.firestore, `${userId}/inventario/items`)
    ).pipe(
      map((items) =>
        items.map((item) => {
          //Retorna objeto de tipo inventario
          return {
            ...(item.data() as any),
            uid: item.id,
          };
        })
      )
    );
  }

  async borrarItemInventario(itemUid: string) {
    const uid = this.authService.user?.userId;
    return await deleteDoc(doc(this.firestore, uid, `inventario/items/${itemUid}`))
  }
}
