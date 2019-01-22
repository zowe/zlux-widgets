import * as Rx from 'rxjs/Rx';
export interface ErrorReportStruct {
    severity: string;
    modal: boolean;
    text: string;
    title: string;
    buttons: string[];
}
export declare enum ZluxErrorSeverity {
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}
export declare class ZluxPopupManagerService {
    eventsSubject: any;
    listeners: any;
    events: any;
    logger: any;
    constructor();
    setLogger(logger: any): void;
    on(name: any, listener: any): void;
    broadcast(name: any, ...args: any[]): void;
    processButtons(buttons: any[]): any[];
    block(): void;
    unblock(): void;
    getLoggerSeverity(severity: ZluxErrorSeverity): any;
    reportError(severity: ZluxErrorSeverity, title: string, text: string, options?: any): Rx.Observable<any>;
}
