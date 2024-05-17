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
  private modifyAutoSubject = new Subject<void>();
  private modifyServicioSubject = new Subject<void>();

  getDeleteEvent(): Observable<void> {
    return this.deleteSubject.asObservable();
  }

  getDeleteSEvent(): Observable<void> {
    return this.deleteSSubject.asObservable();
  }

  emitDeleteSEvent(): void {
    this.deleteSSubject.next();
  }

  emitDeleteEvent(): void {
    this.deleteSubject.next();
  }

  emitModifyservicioEvent(): void {
    this.modifyServicioSubject.next();
  }
  getmodifyServicioEvent(): Observable<void> {
    return this.modifyServicioSubject.asObservable();
  }

  emitModifyAutoEvent(): void {
    this.modifyAutoSubject.next();
  }
  getmodifyAutoEvent(): Observable<void> {
    return this.modifyAutoSubject.asObservable();
  }

  getConfirmationState() {
    return this.confirmationSubject.asObservable();
  }

  setConfirmationState(state: boolean) {
    this.confirmationSubject.next(state);
  }
}
