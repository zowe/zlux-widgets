/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { NgModule, Directive, Component, Input, HostListener, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ZluxFlyover {
    constructor(el) {
        this.el = el;
        this.showDelayMs = 200;
        this.zluxFlyoverDisabled = false;
        this.preparingToShow = false;
    }
    onMouseEnter(e) {
        if (this.flyover) {
            if (this.flyover.hideTimer) {
                clearInterval(this.flyover.hideTimer);
                this.flyover.forceHide();
            }
            if (!this.isEnabled()) {
                return;
            }
            this.preparingToShow = true;
            setTimeout(() => {
                if (this.preparingToShow) {
                    this.flyover.show(this.el.nativeElement, this.position);
                    this.preparingToShow = false;
                }
            }, this.showDelayMs);
        }
    }
    onMouseLeave(e) {
        this.preparingToShow = false;
        this.flyover.hide();
    }
    isEnabled() {
        return this.zluxFlyoverDisabled !== true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxFlyover, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: ZluxFlyover, selector: "[zluxFlyover]", inputs: { flyover: "flyover", position: "position", showDelayMs: "showDelayMs", zluxFlyoverDisabled: "zluxFlyoverDisabled" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "class.rel-positioned": "true" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxFlyover, decorators: [{
            type: Directive,
            args: [{
                    selector: '[zluxFlyover]',
                    host: {
                        '[class.rel-positioned]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { flyover: [{
                type: Input
            }], position: [{
                type: Input
            }], showDelayMs: [{
                type: Input
            }], zluxFlyoverDisabled: [{
                type: Input
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
export class ZluxFlyoverComponent {
    constructor(el) {
        this.el = el;
        this.hideDelayMs = 200;
        this.hover = false;
        this.targetHover = false;
        this.active = false;
        this.position = 'top';
        this.flyoverMarginRight = 15;
        this.flyoverMarginLeft = 15;
        this.flyoverMarginTop = 10;
        this.flyoverMarginBottom = 20;
    }
    ngOnInit() {
        this.arrowTopOffsetLeft = this.contentArea.nativeElement.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = -9;
        this.arrowBottomOffsetLeft = this.contentArea.nativeElement.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = -10;
    }
    onMouseEnter(e) {
        this.hover = true;
        this.active = true;
    }
    onMouseLeave(e) {
        this.hover = false;
        this.hide();
    }
    show(onElement, onPosition = 'top') {
        if (this.hideTimer) {
            this.forceHide();
        }
        this.position = onPosition;
        switch (onPosition) {
            case 'top': {
                this.setTopPosition(onElement);
                break;
            }
            case 'bottom': {
                this.setBottomPosition(onElement);
                break;
            }
            case 'left': {
                this.setLeftPosition(onElement);
                break;
            }
            case 'right': {
                this.setRightPosition(onElement);
                break;
            }
        }
        this.targetHover = true;
        this.active = true;
    }
    GetRelativeShift(onEl, content) {
        let elem = onEl.offsetParent;
        let rect = {
            top: 0,
            left: 0,
            width: elem.clientWidth,
            height: elem.clientHeight
        };
        while (elem !== content.offsetParent) {
            rect.top += elem.offsetTop;
            rect.left += elem.offsetLeft;
            rect.width = elem.clientWidth;
            rect.height = elem.clientHeight;
            elem = elem.offsetParent;
        }
        return rect;
    }
    setTopPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop - content.clientHeight - 20;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth / 2 + onEl.offsetWidth / 2;
        this.arrowTopOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = -9;
        this.arrowBottomOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = -10;
        this.horizontalAlign(onEl, rect);
    }
    setBottomPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight + 20;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth / 2 + onEl.offsetWidth / 2;
        this.arrowTopOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = content.clientHeight - 12;
        this.arrowBottomOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = content.clientHeight - 11;
        this.horizontalAlign(onEl, rect);
    }
    horizontalAlign(onEl, rect) {
        let content = this.contentArea.nativeElement;
        let distToRightEdge = rect.width - onEl.offsetWidth / 2 - onEl.offsetLeft - rect.left;
        if (distToRightEdge < content.clientWidth / 2 + this.flyoverMarginRight) {
            let offset = content.clientWidth / 2 - distToRightEdge + this.flyoverMarginRight;
            this.left -= offset;
            if (distToRightEdge < this.flyoverMarginRight + 15)
                offset = content.clientWidth / 2 - 15;
            this.arrowTopOffsetLeft += offset;
            this.arrowBottomOffsetLeft += offset;
        }
        else {
            let distToLeftEdge = onEl.offsetWidth / 2 + onEl.offsetLeft + rect.left;
            if (distToLeftEdge < content.clientWidth / 2 + this.flyoverMarginLeft) {
                let offset = content.clientWidth / 2 - distToLeftEdge + this.flyoverMarginLeft;
                this.left += offset;
                if (distToLeftEdge < this.flyoverMarginLeft + 15)
                    offset = content.clientWidth / 2 - 15;
                this.arrowTopOffsetLeft -= offset;
                this.arrowBottomOffsetLeft -= offset;
            }
        }
    }
    setLeftPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight / 2 - content.clientHeight / 2;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth - 20;
        this.arrowTopOffsetLeft = content.clientWidth - 12;
        this.arrowTopOffsetBottom = content.clientHeight / 2 - 10;
        this.arrowBottomOffsetLeft = content.clientWidth - 11;
        this.arrowBottomOffsetBottom = content.clientHeight / 2 - 10;
        this.verticalAlign(onEl, rect);
    }
    setRightPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight / 2 - content.clientHeight / 2;
        this.left = rect.left + onEl.offsetLeft + onEl.offsetWidth + 20;
        this.arrowTopOffsetLeft = -9;
        this.arrowTopOffsetBottom = content.clientHeight / 2 - 10;
        this.arrowBottomOffsetLeft = -10;
        this.arrowBottomOffsetBottom = content.clientHeight / 2 - 10;
        this.verticalAlign(onEl, rect);
    }
    verticalAlign(onEl, rect) {
        let content = this.contentArea.nativeElement;
        let distToBottomEdge = rect.height + onEl.offsetHeight / 2 - onEl.offsetTop - rect.top;
        if (distToBottomEdge < content.clientHeight / 2 + this.flyoverMarginBottom) {
            let offset = content.clientHeight / 2 - distToBottomEdge + this.flyoverMarginBottom;
            this.top -= offset;
            if (distToBottomEdge < this.flyoverMarginBottom + 15)
                offset = content.clientHeight / 2 - 15;
            this.arrowTopOffsetBottom -= offset;
            this.arrowBottomOffsetBottom -= offset;
        }
        else {
            let distToTopEdge = onEl.offsetHeight / 2 + onEl.offsetTop + rect.top;
            if (distToTopEdge < content.clientHeight / 2 + this.flyoverMarginTop) {
                let offset = content.clientHeight / 2 - distToTopEdge + this.flyoverMarginTop;
                this.top += offset;
                if (distToTopEdge < this.flyoverMarginTop + 15)
                    offset = content.clientHeight / 2 - 15;
                this.arrowTopOffsetBottom += offset;
                this.arrowBottomOffsetBottom += offset;
            }
        }
    }
    hide() {
        this.targetHover = false;
        this.hideTimer = window.setTimeout(() => {
            this.forceHide();
        }, this.hideDelayMs);
    }
    forceHide() {
        if (!this.targetHover && !this.hover) {
            this.top = undefined;
            this.left = undefined;
            this.active = false;
        }
        this.hideTimer = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxFlyoverComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: ZluxFlyoverComponent, selector: "zlux-flyover", inputs: { hideDelayMs: "hideDelayMs" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, viewQueries: [{ propertyName: "contentArea", first: true, predicate: ["area"], descendants: true }], ngImport: i0, template: "<!-- \n  This program and the accompanying materials are\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n  \n  SPDX-License-Identifier: EPL-2.0\n  \n  Copyright Contributors to the Zowe Project.\n-->\n\n<div class=\"zlux-flyover-area\" [style.top]=\"(active==true?top:-9999)+'px'\" [style.left]=\"(active==true?left:-9999)+'px'\"\n  #area>\n  <div class=\"zlux-flyover-content\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"zlux-flyover-arrow-top-layer\" [style.left]=\"arrowTopOffsetLeft+'px'\"\n    [style.bottom]=\"arrowTopOffsetBottom+'px'\" [ngClass]=\"{\n      'top': position=='top',\n      'bottom': position=='bottom',\n      'left': position=='left',\n      'right': position=='right'\n    }\"></div>\n  <div class=\"zlux-flyover-arrow-bottom-layer\" [style.left]=\"arrowBottomOffsetLeft+'px'\"\n    [style.bottom]=\"arrowBottomOffsetBottom+'px'\"></div>\n</div>\n\n\n<!-- \n  This program and the accompanying materials are\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n  \n  SPDX-License-Identifier: EPL-2.0\n  \n  Copyright Contributors to the Zowe Project.\n-->", styles: [":host{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif}.rel-positioned{position:relative}.zlux-flyover-area{position:absolute;background:transparent;border:transparent;z-index:1}.zlux-flyover-content{padding:10px;border:1px solid #21649F;background:#fff;box-shadow:3px 3px #0000004d}.zlux-flyover-arrow-top-layer{position:absolute;width:20px;height:20px;transform:rotate(45deg);background:transparent}.zlux-flyover-arrow-top-layer.top{border-top:10px solid transparent;border-left:10px solid transparent;border-bottom:10px solid #fff;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.bottom{border-top:10px solid #fff;border-left:10px solid #fff;border-bottom:10px solid transparent;border-right:10px solid transparent}.zlux-flyover-arrow-top-layer.left{border-top:10px solid #fff;border-left:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.right{border-top:10px solid transparent;border-left:10px solid #fff;border-bottom:10px solid #fff;border-right:10px solid transparent}.zlux-flyover-arrow-bottom-layer{position:absolute;width:20px;height:20px;background:#21649f;transform:rotate(45deg);box-shadow:3px 0 #0101014d;z-index:-1}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxFlyoverComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-flyover", template: "<!-- \n  This program and the accompanying materials are\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n  \n  SPDX-License-Identifier: EPL-2.0\n  \n  Copyright Contributors to the Zowe Project.\n-->\n\n<div class=\"zlux-flyover-area\" [style.top]=\"(active==true?top:-9999)+'px'\" [style.left]=\"(active==true?left:-9999)+'px'\"\n  #area>\n  <div class=\"zlux-flyover-content\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"zlux-flyover-arrow-top-layer\" [style.left]=\"arrowTopOffsetLeft+'px'\"\n    [style.bottom]=\"arrowTopOffsetBottom+'px'\" [ngClass]=\"{\n      'top': position=='top',\n      'bottom': position=='bottom',\n      'left': position=='left',\n      'right': position=='right'\n    }\"></div>\n  <div class=\"zlux-flyover-arrow-bottom-layer\" [style.left]=\"arrowBottomOffsetLeft+'px'\"\n    [style.bottom]=\"arrowBottomOffsetBottom+'px'\"></div>\n</div>\n\n\n<!-- \n  This program and the accompanying materials are\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n  \n  SPDX-License-Identifier: EPL-2.0\n  \n  Copyright Contributors to the Zowe Project.\n-->", styles: [":host{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif}.rel-positioned{position:relative}.zlux-flyover-area{position:absolute;background:transparent;border:transparent;z-index:1}.zlux-flyover-content{padding:10px;border:1px solid #21649F;background:#fff;box-shadow:3px 3px #0000004d}.zlux-flyover-arrow-top-layer{position:absolute;width:20px;height:20px;transform:rotate(45deg);background:transparent}.zlux-flyover-arrow-top-layer.top{border-top:10px solid transparent;border-left:10px solid transparent;border-bottom:10px solid #fff;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.bottom{border-top:10px solid #fff;border-left:10px solid #fff;border-bottom:10px solid transparent;border-right:10px solid transparent}.zlux-flyover-arrow-top-layer.left{border-top:10px solid #fff;border-left:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.right{border-top:10px solid transparent;border-left:10px solid #fff;border-bottom:10px solid #fff;border-right:10px solid transparent}.zlux-flyover-arrow-bottom-layer{position:absolute;width:20px;height:20px;background:#21649f;transform:rotate(45deg);box-shadow:3px 0 #0101014d;z-index:-1}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { hideDelayMs: [{
                type: Input
            }], contentArea: [{
                type: ViewChild,
                args: ['area']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
export class ZluxFlyoverModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxFlyoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: ZluxFlyoverModule, declarations: [ZluxFlyoverComponent, ZluxFlyover], imports: [CommonModule], exports: [ZluxFlyoverComponent, ZluxFlyover] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxFlyoverModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxFlyoverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxFlyoverComponent, ZluxFlyover],
                    declarations: [ZluxFlyoverComponent, ZluxFlyover]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx5b3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy96bHV4LXdpZGdldHMvc3JjL2xpYi9jb21wb25lbnRzL2ZseW92ZXIvZmx5b3Zlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy96bHV4LXdpZGdldHMvc3JjL2xpYi9jb21wb25lbnRzL2ZseW92ZXIvZmx5b3Zlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7RUFRRTtBQUVGLE9BQU8sRUFDTCxRQUFRLEVBQ1IsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBRUwsWUFBWSxFQUNaLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQWUvQyxNQUFNLE9BQU8sV0FBVztJQU90QixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUp6QixnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUMxQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDdEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7SUFFSCxDQUFDO0lBR3ZDLFlBQVksQ0FBQyxDQUFRO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDM0IsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztnQkFDdEIsT0FBTztZQUNULENBQUM7WUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixV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LFlBQVk7dUJBQUMsWUFBWTtnQkFPMUIsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVk7O0FBaUw1QixNQUFNLE9BQU8saUJBQWlCOytHQUFqQixpQkFBaUI7Z0hBQWpCLGlCQUFpQixpQkFyTmpCLG9CQUFvQixFQTlDcEIsV0FBVyxhQStQWixZQUFZLGFBak5YLG9CQUFvQixFQTlDcEIsV0FBVztnSEFtUVgsaUJBQWlCLFlBSmxCLFlBQVk7OzRGQUlYLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsQ0FBQztvQkFDNUMsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDO2lCQUNsRCIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4vKlxuICBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZVxuICBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xuICB0aGlzIGRpc3RyaWJ1dGlvbiwgYW5kIGlzIGF2YWlsYWJsZSBhdCBodHRwczovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtdjIwLmh0bWxcbiAgXG4gIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG4gIFxuICBDb3B5cmlnaHQgQ29udHJpYnV0b3JzIHRvIHRoZSBab3dlIFByb2plY3QuXG4qL1xuXG5pbXBvcnQge1xuICBOZ01vZHVsZSxcbiAgRGlyZWN0aXZlLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDaGlsZCxcbiAgT25Jbml0XG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbnRlcmZhY2UgUmVjdCB7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbemx1eEZseW92ZXJdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MucmVsLXBvc2l0aW9uZWRdJzogJ3RydWUnXG4gIH1cbn0pXG5leHBvcnQgY2xhc3MgWmx1eEZseW92ZXIge1xuICBASW5wdXQoKSBmbHlvdmVyITogWmx1eEZseW92ZXJDb21wb25lbnQ7XG4gIEBJbnB1dCgpIHBvc2l0aW9uITogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCc7XG4gIEBJbnB1dCgpIHNob3dEZWxheU1zOiBudW1iZXIgPSAyMDA7XG4gIEBJbnB1dCgpIHpsdXhGbHlvdmVyRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmVwYXJpbmdUb1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZUVudGVyKGU6IEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZmx5b3Zlcikge1xuICAgICAgaWYgKHRoaXMuZmx5b3Zlci5oaWRlVGltZXIpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmZseW92ZXIuaGlkZVRpbWVyKTtcbiAgICAgICAgdGhpcy5mbHlvdmVyLmZvcmNlSGlkZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGFyaW5nVG9TaG93ID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcmVwYXJpbmdUb1Nob3cpIHtcbiAgICAgICAgICB0aGlzLmZseW92ZXIuc2hvdyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMucG9zaXRpb24pO1xuICAgICAgICAgIHRoaXMucHJlcGFyaW5nVG9TaG93ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAgIHRoaXMuc2hvd0RlbGF5TXMpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBvbk1vdXNlTGVhdmUoZTogRXZlbnQpIHtcbiAgICB0aGlzLnByZXBhcmluZ1RvU2hvdyA9IGZhbHNlO1xuICAgIHRoaXMuZmx5b3Zlci5oaWRlKCk7XG4gIH1cblxuICBpc0VuYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuemx1eEZseW92ZXJEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiemx1eC1mbHlvdmVyXCIsXG4gIHRlbXBsYXRlVXJsOiBcImZseW92ZXIuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCJmbHlvdmVyLmNvbXBvbmVudC5jc3NcIl0sXG59KVxuZXhwb3J0IGNsYXNzIFpsdXhGbHlvdmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaGlkZURlbGF5TXM6IG51bWJlciA9IDIwMDtcbiAgdG9wITogYW55O1xuICBsZWZ0ITogYW55O1xuICBob3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICB0YXJnZXRIb3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBhY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYXJyb3dUb3BPZmZzZXRMZWZ0ITogbnVtYmVyO1xuICBhcnJvd1RvcE9mZnNldEJvdHRvbSE6IG51bWJlcjtcbiAgYXJyb3dCb3R0b21PZmZzZXRMZWZ0ITogbnVtYmVyO1xuICBhcnJvd0JvdHRvbU9mZnNldEJvdHRvbSE6IG51bWJlcjtcbiAgcG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuICBmbHlvdmVyTWFyZ2luUmlnaHQ6IG51bWJlciA9IDE1O1xuICBmbHlvdmVyTWFyZ2luTGVmdDogbnVtYmVyID0gMTU7XG4gIGZseW92ZXJNYXJnaW5Ub3A6IG51bWJlciA9IDEwO1xuICBmbHlvdmVyTWFyZ2luQm90dG9tOiBudW1iZXIgPSAyMDtcbiAgaGlkZVRpbWVyITogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hcnJvd1RvcE9mZnNldExlZnQgPSB0aGlzLmNvbnRlbnRBcmVhLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGggLyAyIC0gMTA7XG4gICAgdGhpcy5hcnJvd1RvcE9mZnNldEJvdHRvbSA9IC05O1xuICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRMZWZ0ID0gdGhpcy5jb250ZW50QXJlYS5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoIC8gMiAtIDEwO1xuICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRCb3R0b20gPSAtMTA7XG4gIH1cblxuICBAVmlld0NoaWxkKCdhcmVhJylcbiAgY29udGVudEFyZWEhOiBFbGVtZW50UmVmO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlRW50ZXIoZTogRXZlbnQpIHtcbiAgICB0aGlzLmhvdmVyID0gdHJ1ZTtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZUxlYXZlKGU6IEV2ZW50KSB7XG4gICAgdGhpcy5ob3ZlciA9IGZhbHNlO1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgc2hvdyhvbkVsZW1lbnQ6IGFueSwgb25Qb3NpdGlvbjogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCcgPSAndG9wJykge1xuICAgIGlmICh0aGlzLmhpZGVUaW1lcikge1xuICAgICAgdGhpcy5mb3JjZUhpZGUoKTtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IG9uUG9zaXRpb247XG4gICAgc3dpdGNoIChvblBvc2l0aW9uKSB7XG4gICAgICBjYXNlICd0b3AnOiB7XG4gICAgICAgIHRoaXMuc2V0VG9wUG9zaXRpb24ob25FbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdib3R0b20nOiB7XG4gICAgICAgIHRoaXMuc2V0Qm90dG9tUG9zaXRpb24ob25FbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdsZWZ0Jzoge1xuICAgICAgICB0aGlzLnNldExlZnRQb3NpdGlvbihvbkVsZW1lbnQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3JpZ2h0Jzoge1xuICAgICAgICB0aGlzLnNldFJpZ2h0UG9zaXRpb24ob25FbGVtZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudGFyZ2V0SG92ZXIgPSB0cnVlO1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgR2V0UmVsYXRpdmVTaGlmdChvbkVsOiBhbnksIGNvbnRlbnQ6IGFueSk6IFJlY3Qge1xuICAgIGxldCBlbGVtID0gb25FbC5vZmZzZXRQYXJlbnQ7XG4gICAgbGV0IHJlY3Q6IFJlY3QgPSB7XG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd2lkdGg6IGVsZW0uY2xpZW50V2lkdGgsXG4gICAgICBoZWlnaHQ6IGVsZW0uY2xpZW50SGVpZ2h0XG4gICAgfTtcbiAgICB3aGlsZSAoZWxlbSAhPT0gY29udGVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgIHJlY3QudG9wICs9IGVsZW0ub2Zmc2V0VG9wO1xuICAgICAgcmVjdC5sZWZ0ICs9IGVsZW0ub2Zmc2V0TGVmdDtcbiAgICAgIHJlY3Qud2lkdGggPSBlbGVtLmNsaWVudFdpZHRoO1xuICAgICAgcmVjdC5oZWlnaHQgPSBlbGVtLmNsaWVudEhlaWdodDtcbiAgICAgIGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJlY3Q7XG4gIH1cblxuICBwcml2YXRlIHNldFRvcFBvc2l0aW9uKG9uRWw6IGFueSkge1xuICAgIGxldCBjb250ZW50ID0gdGhpcy5jb250ZW50QXJlYS5uYXRpdmVFbGVtZW50O1xuICAgIGxldCByZWN0OiBSZWN0ID0gdGhpcy5HZXRSZWxhdGl2ZVNoaWZ0KG9uRWwsIGNvbnRlbnQpO1xuICAgIHRoaXMudG9wID0gcmVjdC50b3AgKyBvbkVsLm9mZnNldFRvcCAtIGNvbnRlbnQuY2xpZW50SGVpZ2h0IC0gMjA7XG4gICAgdGhpcy5sZWZ0ID0gcmVjdC5sZWZ0ICsgb25FbC5vZmZzZXRMZWZ0IC0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgKyBvbkVsLm9mZnNldFdpZHRoIC8gMjtcblxuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRMZWZ0ID0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgLSAxMDtcbiAgICB0aGlzLmFycm93VG9wT2Zmc2V0Qm90dG9tID0gLTk7XG4gICAgdGhpcy5hcnJvd0JvdHRvbU9mZnNldExlZnQgPSBjb250ZW50LmNsaWVudFdpZHRoIC8gMiAtIDEwO1xuICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRCb3R0b20gPSAtMTA7XG5cbiAgICB0aGlzLmhvcml6b250YWxBbGlnbihvbkVsLCByZWN0KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Qm90dG9tUG9zaXRpb24ob25FbDogYW55KSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRBcmVhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHJlY3Q6IFJlY3QgPSB0aGlzLkdldFJlbGF0aXZlU2hpZnQob25FbCwgY29udGVudCk7XG4gICAgdGhpcy50b3AgPSByZWN0LnRvcCArIG9uRWwub2Zmc2V0VG9wICsgb25FbC5vZmZzZXRIZWlnaHQgKyAyMDtcbiAgICB0aGlzLmxlZnQgPSByZWN0LmxlZnQgKyBvbkVsLm9mZnNldExlZnQgLSBjb250ZW50LmNsaWVudFdpZHRoIC8gMiArIG9uRWwub2Zmc2V0V2lkdGggLyAyO1xuXG4gICAgdGhpcy5hcnJvd1RvcE9mZnNldExlZnQgPSBjb250ZW50LmNsaWVudFdpZHRoIC8gMiAtIDEwO1xuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRCb3R0b20gPSBjb250ZW50LmNsaWVudEhlaWdodCAtIDEyO1xuICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRMZWZ0ID0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgLSAxMDtcbiAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0Qm90dG9tID0gY29udGVudC5jbGllbnRIZWlnaHQgLSAxMTtcblxuICAgIHRoaXMuaG9yaXpvbnRhbEFsaWduKG9uRWwsIHJlY3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBob3Jpem9udGFsQWxpZ24ob25FbDogYW55LCByZWN0OiBSZWN0KSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRBcmVhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IGRpc3RUb1JpZ2h0RWRnZSA9IHJlY3Qud2lkdGggLSBvbkVsLm9mZnNldFdpZHRoIC8gMiAtIG9uRWwub2Zmc2V0TGVmdCAtIHJlY3QubGVmdDtcbiAgICBpZiAoZGlzdFRvUmlnaHRFZGdlIDwgY29udGVudC5jbGllbnRXaWR0aCAvIDIgKyB0aGlzLmZseW92ZXJNYXJnaW5SaWdodCkge1xuICAgICAgbGV0IG9mZnNldCA9IGNvbnRlbnQuY2xpZW50V2lkdGggLyAyIC0gZGlzdFRvUmlnaHRFZGdlICsgdGhpcy5mbHlvdmVyTWFyZ2luUmlnaHQ7XG4gICAgICB0aGlzLmxlZnQgLT0gb2Zmc2V0O1xuICAgICAgaWYgKGRpc3RUb1JpZ2h0RWRnZSA8IHRoaXMuZmx5b3Zlck1hcmdpblJpZ2h0ICsgMTUpXG4gICAgICAgIG9mZnNldCA9IGNvbnRlbnQuY2xpZW50V2lkdGggLyAyIC0gMTU7XG4gICAgICB0aGlzLmFycm93VG9wT2Zmc2V0TGVmdCArPSBvZmZzZXQ7XG4gICAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0TGVmdCArPSBvZmZzZXQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IGRpc3RUb0xlZnRFZGdlID0gb25FbC5vZmZzZXRXaWR0aCAvIDIgKyBvbkVsLm9mZnNldExlZnQgKyByZWN0LmxlZnQ7XG4gICAgICBpZiAoZGlzdFRvTGVmdEVkZ2UgPCBjb250ZW50LmNsaWVudFdpZHRoIC8gMiArIHRoaXMuZmx5b3Zlck1hcmdpbkxlZnQpIHtcbiAgICAgICAgbGV0IG9mZnNldCA9IGNvbnRlbnQuY2xpZW50V2lkdGggLyAyIC0gZGlzdFRvTGVmdEVkZ2UgKyB0aGlzLmZseW92ZXJNYXJnaW5MZWZ0O1xuICAgICAgICB0aGlzLmxlZnQgKz0gb2Zmc2V0O1xuICAgICAgICBpZiAoZGlzdFRvTGVmdEVkZ2UgPCB0aGlzLmZseW92ZXJNYXJnaW5MZWZ0ICsgMTUpXG4gICAgICAgICAgb2Zmc2V0ID0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgLSAxNTtcbiAgICAgICAgdGhpcy5hcnJvd1RvcE9mZnNldExlZnQgLT0gb2Zmc2V0O1xuICAgICAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0TGVmdCAtPSBvZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRMZWZ0UG9zaXRpb24ob25FbDogYW55KSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRBcmVhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHJlY3Q6IFJlY3QgPSB0aGlzLkdldFJlbGF0aXZlU2hpZnQob25FbCwgY29udGVudCk7XG4gICAgdGhpcy50b3AgPSByZWN0LnRvcCArIG9uRWwub2Zmc2V0VG9wICsgb25FbC5vZmZzZXRIZWlnaHQgLyAyIC0gY29udGVudC5jbGllbnRIZWlnaHQgLyAyO1xuICAgIHRoaXMubGVmdCA9IHJlY3QubGVmdCArIG9uRWwub2Zmc2V0TGVmdCAtIGNvbnRlbnQuY2xpZW50V2lkdGggLSAyMDtcblxuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRMZWZ0ID0gY29udGVudC5jbGllbnRXaWR0aCAtIDEyO1xuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRCb3R0b20gPSBjb250ZW50LmNsaWVudEhlaWdodCAvIDIgLSAxMDtcbiAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0TGVmdCA9IGNvbnRlbnQuY2xpZW50V2lkdGggLSAxMTtcbiAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0Qm90dG9tID0gY29udGVudC5jbGllbnRIZWlnaHQgLyAyIC0gMTA7XG5cbiAgICB0aGlzLnZlcnRpY2FsQWxpZ24ob25FbCwgcmVjdCk7XG4gIH1cblxuICBwcml2YXRlIHNldFJpZ2h0UG9zaXRpb24ob25FbDogYW55KSB7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRBcmVhLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHJlY3Q6IFJlY3QgPSB0aGlzLkdldFJlbGF0aXZlU2hpZnQob25FbCwgY29udGVudCk7XG4gICAgdGhpcy50b3AgPSByZWN0LnRvcCArIG9uRWwub2Zmc2V0VG9wICsgb25FbC5vZmZzZXRIZWlnaHQgLyAyIC0gY29udGVudC5jbGllbnRIZWlnaHQgLyAyO1xuICAgIHRoaXMubGVmdCA9IHJlY3QubGVmdCArIG9uRWwub2Zmc2V0TGVmdCArIG9uRWwub2Zmc2V0V2lkdGggKyAyMDtcblxuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRMZWZ0ID0gLSA5O1xuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRCb3R0b20gPSBjb250ZW50LmNsaWVudEhlaWdodCAvIDIgLSAxMDtcbiAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0TGVmdCA9IC0gMTA7XG4gICAgdGhpcy5hcnJvd0JvdHRvbU9mZnNldEJvdHRvbSA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0IC8gMiAtIDEwO1xuXG4gICAgdGhpcy52ZXJ0aWNhbEFsaWduKG9uRWwsIHJlY3QpO1xuICB9XG5cbiAgcHJpdmF0ZSB2ZXJ0aWNhbEFsaWduKG9uRWw6IGFueSwgcmVjdDogUmVjdCkge1xuICAgIGxldCBjb250ZW50ID0gdGhpcy5jb250ZW50QXJlYS5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBkaXN0VG9Cb3R0b21FZGdlID0gcmVjdC5oZWlnaHQgKyBvbkVsLm9mZnNldEhlaWdodCAvIDIgLSBvbkVsLm9mZnNldFRvcCAtIHJlY3QudG9wO1xuICAgIGlmIChkaXN0VG9Cb3R0b21FZGdlIDwgY29udGVudC5jbGllbnRIZWlnaHQgLyAyICsgdGhpcy5mbHlvdmVyTWFyZ2luQm90dG9tKSB7XG4gICAgICBsZXQgb2Zmc2V0ID0gY29udGVudC5jbGllbnRIZWlnaHQgLyAyIC0gZGlzdFRvQm90dG9tRWRnZSArIHRoaXMuZmx5b3Zlck1hcmdpbkJvdHRvbTtcbiAgICAgIHRoaXMudG9wIC09IG9mZnNldDtcbiAgICAgIGlmIChkaXN0VG9Cb3R0b21FZGdlIDwgdGhpcy5mbHlvdmVyTWFyZ2luQm90dG9tICsgMTUpXG4gICAgICAgIG9mZnNldCA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0IC8gMiAtIDE1O1xuICAgICAgdGhpcy5hcnJvd1RvcE9mZnNldEJvdHRvbSAtPSBvZmZzZXQ7XG4gICAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0Qm90dG9tIC09IG9mZnNldDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgZGlzdFRvVG9wRWRnZSA9IG9uRWwub2Zmc2V0SGVpZ2h0IC8gMiArIG9uRWwub2Zmc2V0VG9wICsgcmVjdC50b3A7XG4gICAgICBpZiAoZGlzdFRvVG9wRWRnZSA8IGNvbnRlbnQuY2xpZW50SGVpZ2h0IC8gMiArIHRoaXMuZmx5b3Zlck1hcmdpblRvcCkge1xuICAgICAgICBsZXQgb2Zmc2V0ID0gY29udGVudC5jbGllbnRIZWlnaHQgLyAyIC0gZGlzdFRvVG9wRWRnZSArIHRoaXMuZmx5b3Zlck1hcmdpblRvcDtcbiAgICAgICAgdGhpcy50b3AgKz0gb2Zmc2V0O1xuICAgICAgICBpZiAoZGlzdFRvVG9wRWRnZSA8IHRoaXMuZmx5b3Zlck1hcmdpblRvcCArIDE1KVxuICAgICAgICAgIG9mZnNldCA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0IC8gMiAtIDE1O1xuICAgICAgICB0aGlzLmFycm93VG9wT2Zmc2V0Qm90dG9tICs9IG9mZnNldDtcbiAgICAgICAgdGhpcy5hcnJvd0JvdHRvbU9mZnNldEJvdHRvbSArPSBvZmZzZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnRhcmdldEhvdmVyID0gZmFsc2U7XG4gICAgdGhpcy5oaWRlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmZvcmNlSGlkZSgpO1xuICAgIH0sIHRoaXMuaGlkZURlbGF5TXMpO1xuICB9XG5cbiAgZm9yY2VIaWRlKCkge1xuICAgIGlmICghdGhpcy50YXJnZXRIb3ZlciAmJiAhdGhpcy5ob3Zlcikge1xuICAgICAgdGhpcy50b3AgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmxlZnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmhpZGVUaW1lciA9IG51bGw7XG4gIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtabHV4Rmx5b3ZlckNvbXBvbmVudCwgWmx1eEZseW92ZXJdLFxuICBkZWNsYXJhdGlvbnM6IFtabHV4Rmx5b3ZlckNvbXBvbmVudCwgWmx1eEZseW92ZXJdXG59KVxuZXhwb3J0IGNsYXNzIFpsdXhGbHlvdmVyTW9kdWxlIHsgfVxuXG5cbi8qXG4gIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXG4gIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXG4gIHRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxuICBcbiAgU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcbiAgXG4gIENvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cbiovXG5cbiIsIjwhLS0gXG4gIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXG4gIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXG4gIHRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxuICBcbiAgU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcbiAgXG4gIENvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cbi0tPlxuXG48ZGl2IGNsYXNzPVwiemx1eC1mbHlvdmVyLWFyZWFcIiBbc3R5bGUudG9wXT1cIihhY3RpdmU9PXRydWU/dG9wOi05OTk5KSsncHgnXCIgW3N0eWxlLmxlZnRdPVwiKGFjdGl2ZT09dHJ1ZT9sZWZ0Oi05OTk5KSsncHgnXCJcbiAgI2FyZWE+XG4gIDxkaXYgY2xhc3M9XCJ6bHV4LWZseW92ZXItY29udGVudFwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ6bHV4LWZseW92ZXItYXJyb3ctdG9wLWxheWVyXCIgW3N0eWxlLmxlZnRdPVwiYXJyb3dUb3BPZmZzZXRMZWZ0KydweCdcIlxuICAgIFtzdHlsZS5ib3R0b21dPVwiYXJyb3dUb3BPZmZzZXRCb3R0b20rJ3B4J1wiIFtuZ0NsYXNzXT1cIntcbiAgICAgICd0b3AnOiBwb3NpdGlvbj09J3RvcCcsXG4gICAgICAnYm90dG9tJzogcG9zaXRpb249PSdib3R0b20nLFxuICAgICAgJ2xlZnQnOiBwb3NpdGlvbj09J2xlZnQnLFxuICAgICAgJ3JpZ2h0JzogcG9zaXRpb249PSdyaWdodCdcbiAgICB9XCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ6bHV4LWZseW92ZXItYXJyb3ctYm90dG9tLWxheWVyXCIgW3N0eWxlLmxlZnRdPVwiYXJyb3dCb3R0b21PZmZzZXRMZWZ0KydweCdcIlxuICAgIFtzdHlsZS5ib3R0b21dPVwiYXJyb3dCb3R0b21PZmZzZXRCb3R0b20rJ3B4J1wiPjwvZGl2PlxuPC9kaXY+XG5cblxuPCEtLSBcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXG4gIFxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICBcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxuLS0+Il19