import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { Name } from '../name.model';
import { NamesService } from '../names.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'votes', 'actions'];
  dataSource = new MatTableDataSource<Name>([]);
  subscription: Subscription;

  constructor(private dialog: MatDialog,
    private namesService: NamesService) {}

  ngOnInit() {
    this.subscription = this.namesService.namesSnapshotChanges().subscribe(resp =>
      this.dataSource.data = resp.map(a => {
        const data = a.payload.doc.data() as Name;
        data.id = a.payload.doc.id;
        return data;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  vote(item: Name) {
    this.namesService.vote(item);
  }

  confirmDelete(item: Name) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.namesService.deleteName(item);
      }
    });
  }

}
