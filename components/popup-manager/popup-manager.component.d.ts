import { ZluxPopupManagerService, ErrorReportStruct } from '../../services/popup-manager.service';
export declare class ZluxPopupManagerComponent {
    private popupManager;
    static REPORT_VISIBLE_TIMEOUT: number;
    blockCount: number;
    currentErrorBlocking: ErrorReportStruct;
    currentErrorNonblocking: ErrorReportStruct;
    errors: ErrorReportStruct[];
    constructor(popupManager: ZluxPopupManagerService);
    updateErrors(): void;
    createReport(error: any): void;
    block(): void;
    unblock(): void;
    onChoose(error: any, buttonCaption: any): void;
    getClass(): string;
}
export declare class ZluxPopupManagerModule {
}
