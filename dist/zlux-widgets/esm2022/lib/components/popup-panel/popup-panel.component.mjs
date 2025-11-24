/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZluxPopupManagerService } from '../../services/popup-manager.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/popup-manager.service";
import * as i2 from "@angular/common";
export class ZluxPopupPanelComponent {
    constructor(popupManager) {
        this.popupManager = popupManager;
        this.isActive = false;
        this.modal = false;
        this.autoShow = false;
        this.ignoreVeil = false;
        this.blockDisplay = false;
    }
    ngOnInit() {
        if (this.autoShow) {
            this.show();
        }
    }
    ngOnDestroy() {
        if (this.autoShow) {
            this.hide();
        }
    }
    show() {
        if (this.modal) {
            this.popupManager.block();
        }
        this.isActive = true;
    }
    hide() {
        if (this.modal) {
            this.popupManager.unblock();
        }
        this.isActive = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupPanelComponent, deps: [{ token: i1.ZluxPopupManagerService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: ZluxPopupPanelComponent, selector: "zlux-popup-panel", inputs: { modal: "modal", autoShow: "autoShow", ignoreVeil: "ignoreVeil", blockDisplay: "blockDisplay" }, ngImport: i0, template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n@if (isActive) {\n<div [ngClass]=\"{'popup-panel': true, 'ignoreVeil': ignoreVeil, 'blockDisplay': blockDisplay}\">\n  <ng-content>\n  </ng-content>\n</div>\n}\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".popup-panel{display:inline-block;position:relative;margin:0;padding:0;z-index:50}.blockDisplay{display:block}.ignoreVeil{z-index:200}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-popup-panel", template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n@if (isActive) {\n<div [ngClass]=\"{'popup-panel': true, 'ignoreVeil': ignoreVeil, 'blockDisplay': blockDisplay}\">\n  <ng-content>\n  </ng-content>\n</div>\n}\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".popup-panel{display:inline-block;position:relative;margin:0;padding:0;z-index:50}.blockDisplay{display:block}.ignoreVeil{z-index:200}\n"] }]
        }], ctorParameters: () => [{ type: i1.ZluxPopupManagerService }], propDecorators: { modal: [{
                type: Input
            }], autoShow: [{
                type: Input
            }], ignoreVeil: [{
                type: Input
            }], blockDisplay: [{
                type: Input
            }] } });
export class ZluxPopupPanelModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupPanelModule, declarations: [ZluxPopupPanelComponent], imports: [CommonModule], exports: [ZluxPopupPanelComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupPanelModule, providers: [ZluxPopupManagerService], imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxPopupPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxPopupPanelComponent],
                    declarations: [ZluxPopupPanelComponent],
                    providers: [ZluxPopupManagerService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvemx1eC13aWRnZXRzL3NyYy9saWIvY29tcG9uZW50cy9wb3B1cC1wYW5lbC9wb3B1cC1wYW5lbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy96bHV4LXdpZGdldHMvc3JjL2xpYi9jb21wb25lbnRzL3BvcHVwLXBhbmVsL3BvcHVwLXBhbmVsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7OztFQVFFO0FBRUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFPL0UsTUFBTSxPQUFPLHVCQUF1QjtJQU9sQyxZQUFvQixZQUFxQztRQUFyQyxpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFOekQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUNqQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQUl2QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7K0dBcENVLHVCQUF1QjttR0FBdkIsdUJBQXVCLGtLQ3RCcEMscXhCQTBCRzs7NEZESlUsdUJBQXVCO2tCQUxuQyxTQUFTOytCQUNFLGtCQUFrQjs0RkFNbkIsS0FBSztzQkFBYixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLOztBQXdDUixNQUFNLE9BQU8sb0JBQW9COytHQUFwQixvQkFBb0I7Z0hBQXBCLG9CQUFvQixpQkE3Q3BCLHVCQUF1QixhQXdDeEIsWUFBWSxhQXhDWCx1QkFBdUI7Z0hBNkN2QixvQkFBb0IsYUFGcEIsQ0FBQyx1QkFBdUIsQ0FBQyxZQUgxQixZQUFZOzs0RkFLWCxvQkFBb0I7a0JBTmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKlxuICBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZVxuICBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xuICB0aGlzIGRpc3RyaWJ1dGlvbiwgYW5kIGlzIGF2YWlsYWJsZSBhdCBodHRwczovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtdjIwLmh0bWxcbiAgXG4gIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG4gIFxuICBDb3B5cmlnaHQgQ29udHJpYnV0b3JzIHRvIHRoZSBab3dlIFByb2plY3QuXG4qL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFpsdXhQb3B1cE1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcG9wdXAtbWFuYWdlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcInpsdXgtcG9wdXAtcGFuZWxcIixcbiAgdGVtcGxhdGVVcmw6IFwicG9wdXAtcGFuZWwuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJwb3B1cC1wYW5lbC5jb21wb25lbnQuY3NzXCJdLFxufSlcbmV4cG9ydCBjbGFzcyBabHV4UG9wdXBQYW5lbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95e1xuICBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBtb2RhbDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhdXRvU2hvdzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBpZ25vcmVWZWlsOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGJsb2NrRGlzcGxheTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9wdXBNYW5hZ2VyOiBabHV4UG9wdXBNYW5hZ2VyU2VydmljZSkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5hdXRvU2hvdykge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuYXV0b1Nob3cpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgIHRoaXMucG9wdXBNYW5hZ2VyLmJsb2NrKCk7XG4gICAgfVxuXG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBoaWRlKCkge1xuICAgIGlmICh0aGlzLm1vZGFsKSB7XG4gICAgICB0aGlzLnBvcHVwTWFuYWdlci51bmJsb2NrKCk7XG4gICAgfVxuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1psdXhQb3B1cFBhbmVsQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbWmx1eFBvcHVwUGFuZWxDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtabHV4UG9wdXBNYW5hZ2VyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgWmx1eFBvcHVwUGFuZWxNb2R1bGUgeyB9XG5cblxuLypcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXG4gIFxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICBcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxuKi9cblxuIiwiPCEtLVxuVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcbm1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXG50aGlzIGRpc3RyaWJ1dGlvbiwgYW5kIGlzIGF2YWlsYWJsZSBhdCBodHRwczovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtdjIwLmh0bWxcblxuU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcblxuQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxuLS0+XG5cbkBpZiAoaXNBY3RpdmUpIHtcbjxkaXYgW25nQ2xhc3NdPVwieydwb3B1cC1wYW5lbCc6IHRydWUsICdpZ25vcmVWZWlsJzogaWdub3JlVmVpbCwgJ2Jsb2NrRGlzcGxheSc6IGJsb2NrRGlzcGxheX1cIj5cbiAgPG5nLWNvbnRlbnQ+XG4gIDwvbmctY29udGVudD5cbjwvZGl2PlxufVxuXG5cbjwhLS1cblRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXG5tYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xudGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXG5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG5cbkNvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cbi0tPiJdfQ==