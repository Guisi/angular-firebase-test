import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference, DocumentSnapshot } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Name } from './name.model';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class NamesService {

  readonly collectionName = '/names';

  constructor(private db: AngularFirestore) { }

  private namesCollection() {
    return this.db.collection(this.collectionName);
  }

  namesSnapshotChanges(): Observable<DocumentChangeAction<Name>[]> {
    return this.namesCollection().snapshotChanges();
  }

  deleteName(item: Name): Promise<void> {
    return this.namesCollection().doc(item.id).delete();
  }

  getName(id: string): Promise<firestore.DocumentSnapshot> {
    return this.namesCollection().doc(id).ref.get();
  }

  vote(item: Name) {
    item.votes++;
    this.namesCollection().doc(item.id).ref.update({ votes: item.votes });
  }

  saveName(id: string, name: string): Promise<any> {
    if (id) {
      return this.namesCollection().doc(id).ref.update({ name : name });
    } else {
      return this.namesCollection().add({ name : name, votes: 0 });
    }
  }
}
