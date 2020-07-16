import { Injectable, TemplateRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BsModalService, ModalOptions } from "ngx-bootstrap/modal";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "my-modal modal-dialog-centered width-big",
  };

  constructor(private modalService: BsModalService) {}

  show(template: TemplateRef<any>, config?: ModalOptions): BsModalRef {
    this.modalRef = this.modalService.show(
      template,
      config ? this.config : config
    );
    this.modalService.onHidden.subscribe((reason: string) => {
      const message = reason ? `, dismissed by ${reason}` : "";
      console.log(
        "~ HeaderComponent~openmodel reason for dialog close:" + message
      );
    });
    return this.modalRef;
  }
  hide(modalRef?: BsModalRef) {
    modalRef ? modalRef.hide() : this.modalRef.hide();
  }
}
