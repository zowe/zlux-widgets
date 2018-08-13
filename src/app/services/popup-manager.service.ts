

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

export interface ErrorReportStruct {
  severity: string,
  modal: boolean,
  text: string,
  title: string,
  buttons: string[]
}

export enum ZluxErrorSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

@Injectable()
export class ZluxPopupManagerService {
  eventsSubject: any;
  listeners: any;
  events: any;
  logger: any = undefined;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Rx.Subject();

    this.events = Rx.Observable.from(this.eventsSubject);

    this.events.subscribe(
      ({name, args}) => {
        if (this.listeners[name]) {
          for (let listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  setLogger(logger: any) {
    this.logger = logger;
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  broadcast(name, ...args) {
    this.eventsSubject.next({
        name,
        args
    });
  }

  processButtons(buttons: any[]) {
    return buttons.map(button => {
      if (typeof(button) === 'string') {
        button = {
          caption: button
        }
      }

      button.closeReport = button.closeReport != null ? button.closeReport : true;

      return button;
    });
  }

  block() {
    this.broadcast('block');
  }

  unblock() {
    this.broadcast('unblock');
  }

  getLoggerSeverity(severity: ZluxErrorSeverity) {
    switch (severity) {
      case ZluxErrorSeverity.ERROR: return this.logger.SEVERE;
      case ZluxErrorSeverity.WARNING: return this.logger.WARNING;
      case ZluxErrorSeverity.INFO: return this.logger.INFO;
    }
  }

  reportError(severity: ZluxErrorSeverity, title: string, text: string, options?: any): Rx.Observable<any> {
    options = options || {};
    let buttons = options.buttons || ["Close"];
    const timestamp: Date = options.timestamp || new Date();

    buttons = this.processButtons(buttons);

    const subject = new Rx.ReplaySubject();
    this.broadcast('createReport', {
      severity,
      title,
      text,
      buttons,
      subject,
      timestamp,
      modal: options.blocking || false
    } as ErrorReportStruct);

    if (this.logger) {
      this.logger.log(this.getLoggerSeverity(severity), text);
    }

    return subject;
  }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

