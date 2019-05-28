import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { Name } from '../name.model';
import { NamesService } from '../names.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: string;
  name: string;

  constructor(
    private router: Router,
    private namesService: NamesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.namesService.getName(id).then(doc => {
        this.id = doc.id;
        this.name = doc.data().name;
      });
    }
  }

  cancel() {
    this.goToList();
  }

  private goToList() {
    this.router.navigate(['/names']);
  }

  save() {
    this.namesService.saveName(this.id, this.name)
      .then(r => this.goToList());
  }

}
