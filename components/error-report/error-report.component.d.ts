import { EventEmitter } from '@angular/core';
export declare class ZluxErrorReportComponent {
    severity: string;
    title: string;
    buttons: string[];
    timestamp: Date | undefined;
    action: EventEmitter<any>;
    constructor();
}
export declare class ZluxErrorReportModule {
}
