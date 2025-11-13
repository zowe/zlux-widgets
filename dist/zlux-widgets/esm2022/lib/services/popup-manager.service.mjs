/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs/Rx';
import { Subject, ReplaySubject, from } from 'rxjs';
import * as i0 from "@angular/core";
function getSimpleID() {
    return Number(Math.random() + Date.now());
}
export var ZluxErrorSeverity;
(function (ZluxErrorSeverity) {
    ZluxErrorSeverity["ERROR"] = "error";
    ZluxErrorSeverity["WARNING"] = "warning";
    ZluxErrorSeverity["INFO"] = "info";
})(ZluxErrorSeverity || (ZluxErrorSeverity = {}));
export class ZluxPopupManagerService {
    constructor() {
        this.logger = undefined;
        this.listeners = {};
        this.eventsSubject = new Subject();
        this.events = from(this.eventsSubject);
        this.events.subscribe(({ name, args }) => {
            if (this.listeners[name]) {
                for (let listener of this.listeners[name]) {
                    listener(...args);
                }
            }
        });
    }
    setLogger(logger) {
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
    processButtons(buttons) {
        return buttons.map(button => {
            if (typeof (button) === 'string') {
                button = {
                    caption: button
                };
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
    getLoggerSeverity(severity) {
        switch (severity) {
            case ZluxErrorSeverity.ERROR: return this.logger.SEVERE;
            case ZluxErrorSeverity.WARNING: return this.logger.WARNING;
            case ZluxErrorSeverity.INFO: return this.logger.INFO;
        }
    }
    removeReport(id) {
        this.broadcast('removeReport', id);
    }
    createErrorReport(severity, title, text, options) {
        options = options || {};
        let buttons = options.buttons || ["Close"];
        let timestamp;
        if (options.timestamp == false) {
            timestamp = undefined;
        }
        else {
            timestamp = options.timestamp || new Date();
        }
        buttons = this.processButtons(buttons);
        const subject = new ReplaySubject();
        let errorReport = {
            severity,
            title,
            text,
            buttons,
            subject,
            timestamp,
            id: getSimpleID(),
            modal: options.blocking || false,
            theme: options.theme || "",
            style: options.style || {},
            callToAction: options.callToAction || false
        };
        //the object will be shallow cloned
        this.broadcast('createReport', errorReport);
        if (this.logger) {
            this.logger.log(this.getLoggerSeverity(severity), text);
        }
        return errorReport;
    }
    reportError(severity, title, text, options) {
        options = options || {};
        let buttons = options.buttons || ["Close"];
        const timestamp = options.timestamp || new Date();
        buttons = this.processButtons(buttons);
        const subject = new ReplaySubject();
        this.broadcast('createReport', {
            severity,
            title,
            text,
            buttons,
            subject,
            timestamp,
            id: getSimpleID(),
            modal: options.blocking || false
        });
        if (this.logger) {
            this.logger.log(this.getLoggerSeverity(severity), text);
        }
        return subject;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupManagerService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvemx1eC13aWRnZXRzL3NyYy9saWIvc2VydmljZXMvcG9wdXAtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7OztFQVFFO0FBRUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxpQ0FBaUM7QUFDakMsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUVoRSxTQUFTLFdBQVc7SUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFnQkQsTUFBTSxDQUFOLElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUMzQixvQ0FBZSxDQUFBO0lBQ2Ysd0NBQW1CLENBQUE7SUFDbkIsa0NBQWEsQ0FBQTtBQUNmLENBQUMsRUFKVyxpQkFBaUIsS0FBakIsaUJBQWlCLFFBSTVCO0FBR0QsTUFBTSxPQUFPLHVCQUF1QjtJQU1sQztRQUZBLFdBQU0sR0FBUSxTQUFTLENBQUM7UUFHdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDbkIsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUN6QixLQUFLLElBQUksUUFBUSxJQUFJ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LEVBQUUsRUFBRSxXQUFXLEVBQUU7WUFDakIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksS0FBSztTQUNaLENBQUMsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7K0dBeElVLHVCQUF1QjttSEFBdkIsdUJBQXVCOzs0RkFBdkIsdUJBQXVCO2tCQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi8qXG4gIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXG4gIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXG4gIHRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxuICBcbiAgU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcbiAgXG4gIENvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cbiovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCAqIGFzIFJ4IGZyb20gJ3J4anMvUngnO1xuaW1wb3J0IHsgU3ViamVjdCwgUmVwbGF5U3ViamVjdCwgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5mdW5jdGlvbiBnZXRTaW1wbGVJRCgpIHtcbiAgcmV0dXJuIE51bWJlcihNYXRoLnJhbmRvbSgpICsgRGF0ZS5ub3coKSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRXJyb3JSZXBvcnRTdHJ1Y3Qge1xuICBzZXZlcml0eTogc3RyaW5nLFxuICBtb2RhbDogYm9vbGVhbixcbiAgdGV4dDogc3RyaW5nLFxuICB0aXRsZTogc3RyaW5nLFxuICBidXR0b25zOiBzdHJpbmdbXSxcbiAgaWQ6IG51bWJlcixcbiAgdGltZXN0YW1wOiBEYXRlIHwgdW5kZWZpbmVkLFxuICBzdWJqZWN0OiBTdWJqZWN0PGFueT4sXG4gIHRoZW1lPzogc3RyaW5nLFxuICBzdHlsZT86IHt9LFxuICBjYWxsVG9BY3Rpb24/OiBib29sZWFuXG59XG5cbmV4cG9ydCBlbnVtIFpsdXhFcnJvclNldmVyaXR5IHtcbiAgRVJST1IgPSAnZXJyb3InLFxuICBXQVJOSU5HID0gJ3dhcm5pbmcnLFxuICBJTkZPID0gJ2luZm8nXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBabHV4UG9wdXBNYW5hZ2VyU2VydmljZSB7XG4gIGV2ZW50c1N1YmplY3Q6IGFueTtcbiAgbGlzdGVuZXJzOiBhbnk7XG4gIGV2ZW50czogYW55O1xuICBsb2dnZXI6IGFueSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgIHRoaXMuZXZlbnRzU3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICB0aGlzLmV2ZW50cyA9IGZyb20odGhpcy5ldmVudHNTdWJqZWN0KTtcblxuICAgIHRoaXMuZXZlbnRzLnN1YnNjcmliZShcbiAgICAgICh7IG5hbWUsIGFyZ3MgfSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbbmFtZV0pIHtcbiAgICAgICAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xuICAgICAgICAgICAgbGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHNldExvZ2dlcihsb2dnZXI6IGFueSkge1xuICAgIHRoaXMubG9nZ2VyID0gbG9nZ2VyO1xuICB9XG5cbiAgb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgYnJvYWRjYXN0KG5hbWUsIC4uLmFyZ3MpIHtcbiAgICB0aGlzLmV2ZW50c1N1YmplY3QubmV4dCh7XG4gICAgICBuYW1lLFxuICAgICAgYXJnc1xuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc0J1dHRvbnMoYnV0dG9uczogYW55W10pIHtcbiAgICByZXR1cm4gYnV0dG9ucy5tYXAoYnV0dG9uID0+IHtcbiAgICAgIGlmICh0eXBlb2YgKGJ1dHRvbikgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGJ1dHRvbiA9IHtcbiAgICAgICAgICBjYXB0aW9uOiBidXR0b25cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBidXR0b24uY2xvc2VSZXBvcnQgPSBidXR0b24uY2xvc2VSZXBvcnQgIT0gbnVsbCA/IGJ1dHRvbi5jbG9zZVJlcG9ydCA6IHRydWU7XG5cbiAgICAgIHJldHVybiBidXR0b247XG4gICAgfSk7XG4gIH1cblxuICBibG9jaygpIHtcbiAgICB0aGlzLmJyb2FkY2FzdCgnYmxvY2snKTtcbiAgfVxuXG4gIHVuYmxvY2soKSB7XG4gICAgdGhpcy5icm9hZGNhc3QoJ3VuYmxvY2snKTtcbiAgfVxuXG4gIGdldExvZ2dlclNldmVyaXR5KHNldmVyaXR5OiBabHV4RXJyb3JTZXZlcml0eSkge1xuICAgIHN3aXRjaCAoc2V2ZXJpdHkpIHtcbiAgICAgIGNhc2UgWmx1eEVycm9yU2V2ZXJpdHkuRVJST1I6IHJldHVybiB0aGlzLmxvZ2dlci5TRVZFUkU7XG4gICAgICBjYXNlIFpsdXhFcnJvclNldmVyaXR5LldBUk5JTkc6IHJldHVybiB0aGlzLmxvZ2dlci5XQVJOSU5HO1xuICAgICAgY2FzZSBabHV4RXJyb3JTZXZlcml0eS5JTkZPOiByZXR1cm4gdGhpcy5sb2dnZXIuSU5GTztcbiAgICB9XG4gIH1cblxuICByZW1vdmVSZXBvcnQoaWQ6IG51bWJlcikge1xuICAgIHRoaXMuYnJvYWRjYXN0KCdyZW1vdmVSZXBvcnQnLCBpZCk7XG4gIH1cblxuICBjcmVhdGVFcnJvclJlcG9ydChzZXZlcml0eTogWmx1eEVycm9yU2V2ZXJpdHksIHRpdGxlOiBzdHJpbmcsIHRleHQ6IHN0cmluZywgb3B0aW9ucz86IGFueSk6IEVycm9yUmVwb3J0U3RydWN0IHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBsZXQgYnV0dG9ucyA9IG9wdGlvbnMuYnV0dG9ucyB8fCBbXCJDbG9zZVwiXTtcbiAgICBsZXQgdGltZXN0YW1wOiBEYXRlIHwgdW5kZWZpbmVkO1xuICAgIGlmIChvcHRpb25zLnRpbWVzdGFtcCA9PSBmYWxzZSkge1xuICAgICAgdGltZXN0YW1wID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lc3RhbXAgPSBvcHRpb25zLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIGJ1dHRvbnMgPSB0aGlzLnByb2Nlc3NCdXR0b25zKGJ1dHRvbnMpO1xuICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuXG4gICAgbGV0IGVycm9yUmVwb3J0OiBFcnJvclJlcG9ydFN0cnVjdCA9IHtcbiAgICAgIHNldmVyaXR5LFxuICAgICAgdGl0bGUsXG4gICAgICB0ZXh0LFxuICAgICAgYnV0dG9ucyxcbiAgICAgIHN1YmplY3QsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgICBpZDogZ2V0U2ltcGxlSUQoKSxcbiAgICAgIG1vZGFsOiBvcHRpb25zLmJsb2NraW5nIHx8IGZhbHNlLFxuICAgICAgdGhlbWU6IG9wdGlvbnMudGhlbWUgfHwgXCJcIixcbiAgICAgIHN0eWxlOiBvcHRpb25zLnN0eWxlIHx8IHt9LFxuICAgICAgY2FsbFRvQWN0aW9uOiBvcHRpb25zLmNhbGxUb0FjdGlvbiB8fCBmYWxzZVxuICAgIH07XG5cbiAgICAvL3RoZSBvYmplY3Qgd2lsbCBiZSBzaGFsbG93IGNsb25lZFxuICAgIHRoaXMuYnJvYWRjYXN0KCdjcmVhdGVSZXBvcnQnLCBlcnJvclJlcG9ydCk7XG5cbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyh0aGlzLmdldExvZ2dlclNldmVyaXR5KHNldmVyaXR5KSwgdGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9yUmVwb3J0O1xuICB9XG5cbiAgcmVwb3J0RXJyb3Ioc2V2ZXJpdHk6IFpsdXhFcnJvclNldmVyaXR5LCB0aXRsZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGxldCBidXR0b25zID0gb3B0aW9ucy5idXR0b25zIHx8IFtcIkNsb3NlXCJdO1xuICAgIGNvbnN0IHRpbWVzdGFtcDogRGF0ZSA9IG9wdGlvbnMudGltZXN0YW1wIHx8IG5ldyBEYXRlKCk7XG5cbiAgICBidXR0b25zID0gdGhpcy5wcm9jZXNzQnV0dG9ucyhidXR0b25zKTtcblxuICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgUmVwbGF5U3ViamVjdCgpO1xuICAgIHRoaXMuYnJvYWRjYXN0KCdjcmVhdGVSZXBvcnQnLCB7XG4gICAgICBzZXZlcml0eSxcbiAgICAgIHRpdGxlLFxuICAgICAgdGV4dCxcbiAgICAgIGJ1dHRvbnMsXG4gICAgICBzdWJqZWN0LFxuICAgICAgdGltZXN0YW1wLFxuICAgICAgaWQ6IGdldFNpbXBsZUlEKCksXG4gICAgICBtb2RhbDogb3B0aW9ucy5ibG9ja2luZyB8fCBmYWxzZVxuICAgIH0gYXMgRXJyb3JSZXBvcnRTdHJ1Y3QpO1xuXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XG4gICAgICB0aGlzLmxvZ2dlci5sb2codGhpcy5nZXRMb2dnZXJTZXZlcml0eShzZXZlcml0eSksIHRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiBzdWJqZWN0O1xuICB9XG59XG5cblxuLypcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXG4gIFxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICBcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxuKi9cblxuIl19