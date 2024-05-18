// confirmation.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private confirmationSubject = new Subject<boolean>();
  private deleteSubject = new Subject<void>();
  private deleteSSubject = new Subject<void>();
  private modifySubject = new Subject<void>();

  getDeleteEvent(): Observable<void> {
    return this.deleteSubject.asObservable();
  }
  emitDeleteEvent(): void {
    this.deleteSubject.next();
  }



  getDeleteSEvent(): Observable<void> {
    return this.deleteSSubject.asObservable();
  }

  emitDeleteSEvent(): void {
    this.deleteSSubject.next();
  }



  emitModifyEvent(): void {
    this.modifySubject.next();
  }
  getModifyEvent(): Observable<void> {
    return this.modifySubject.asObservable();
  }

 



  getConfirmationState() {
    return this.confirmationSubject.asObservable();
  }

  setConfirmationState(state: boolean) {
    this.confirmationSubject.next(state);
  }
}
