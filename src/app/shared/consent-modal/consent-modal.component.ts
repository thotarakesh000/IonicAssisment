import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.scss'],
})
export class ConsentModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() { }

  closeModal(data:any) {
    this.modalService.closeModal(data);
  }
}
