/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { NgModule, Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
//We leave this a component and not a service, as to give each component the ability
//to set their own max tabs without conflicting with other components.
export class ZluxTabbingComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.hiddenIds = '';
        this.hiddenPos = '';
        this.focusableArr = [];
        this.idArr = [];
        this.activeTab = 0;
        this.tabEvent = false;
        this.parentRef = this.elementRef.nativeElement.parentElement;
    }
    ngAfterViewInit() {
        this.initValues(this.parentRef);
    }
    initValues(eleRef) {
        if (eleRef) {
            this.focusableArr = this.findAllFocusable(eleRef);
            this.idArr = this.getAllIds(this.focusableArr);
            this.totalTabs = this.focusableArr.length;
            this.tabEvent = false;
            this.activeTab = 0;
            this.setFocusActiveTab(true);
        }
    }
    tabToNext(e) {
        e.preventDefault();
        this.switchTab(true);
    }
    tabToPrev(e) {
        e.preventDefault();
        this.switchTab(false);
    }
    switchTab(isForward) {
        this.tabEvent = true;
        if (isForward) {
            this.moveForward();
        }
        else {
            this.moveBackward();
        }
        this.setFocusActiveTab(isForward);
    }
    moveForward() {
        this.activeTab++;
        if (this.activeTab == this.totalTabs) {
            this.activeTab = 0;
        }
    }
    moveBackward() {
        if (this.activeTab == 0) {
            this.activeTab = this.totalTabs - 1;
        }
        else {
            this.activeTab--;
        }
    }
    setFocusActiveTab(isForward) {
        //TODO: Element.focus seems to fail at times. Logging the element shows it does not *seem* like a timing issue for
        //the querySelector method, but rather the focus method, and adding a 200ms delay showed reliability when testing
        if (this.focusableArr) {
            let element = this.focusableArr[this.activeTab];
            if (element && document.body.contains(element)) {
                if (this.isElementDisabled(element)) {
                    this.switchTab(isForward);
                    return;
                }
                this.focusElement(element);
            }
            else {
                element = this.checkAndAddElmAgain(this.idArr[this.activeTab], this.activeTab);
                if (!element) {
                    this.switchTab(isForward);
                    return;
                }
                this.focusElement(element);
            }
        }
    }
    isElementDisabled(element) {
        return element && element.getAttribute("disabled") != null;
    }
    focusElement(element) {
        if (element)
            setTimeout(() => { element.focus(); }, 200);
    }
    checkAndAddElmAgain(selector, elmIndex) {
        const root = this.parentRef || document;
        const newElm = root.querySelector(selector);
        this.focusableArr[elmIndex] = newElm;
        return newElm;
    }
    getElementSelector(elm) {
        let selector = '';
        if (elm) {
            selector = this.getIdSelector(elm);
            if (selector == '') {
                selector = this.getAttributeSelector(elm);
                selector += this.getClassListSelector(elm);
            }
        }
        return selector;
    }
    getIdSelector(elm) {
        let selector = elm.getAttribute('id') || '';
        if (selector > '')
            return `#${selector}`;
        return selector;
    }
    getAttributeSelector(elm) {
        const attr = elm.attributes[0].name;
        const val = elm[attr] || '';
        const selector = `[${attr}='${val}']`;
        return selector;
    }
    getClassListSelector(elm) {
        const selector = '.' + Array.prototype.join.call(elm.classList, ',.') || '';
        return selector;
    }
    syncActiveTab(elm) {
        //focusin triggered because of switch tab not from input click
        //no activeTab sync required
        if (this.tabEvent) {
            this.tabEvent = false;
            return;
        }
        this.activeTab = this.extractTabId(elm);
    }
    extractTabId(elm) {
        if (this.focusableArr) {
            const tabId = this.focusableArr.findIndex(e => { return elm == e; });
            if (tabId && tabId > 0) {
                return tabId;
            }
        }
        return this.activeTab;
    }
    findAllFocusable(domRef) {
        let lists = [];
        if (domRef && domRef['querySelectorAll'] != null) {
            const selectorStr = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            lists = Array.from(domRef.querySelectorAll(selectorStr));
            lists = lists.sort((elm1, elm2) => {
                let tab1 = parseInt(elm1.getAttribute('tabindex')) || 0;
                let tab2 = parseInt(elm2.getAttribute('tabindex')) || 0;
                return tab2 - tab1;
            });
        }
        if (this.hiddenPos) {
            this.hiddenPos.split(',').map(val => parseInt(val)).forEach((val) => {
                lists.splice(val - 1, 0);
            });
        }
        return lists;
    }
    getAllIds(focusableArr) {
        let lists = [];
        let duplicates = [];
        lists = focusableArr.map(elm => this.getElementSelector(elm));
        if (this.hiddenPos && this.hiddenIds) {
            const idsArr = this.hiddenIds.split(',').map(s => `#${s}`);
            lists.forEach((selector, idx) => {
                if (idsArr.indexOf(selector) >= 0) {
                    duplicates.push(idx);
                }
            });
            this.hiddenPos.split(',').map(val => parseInt(val)).forEach((val, idx) => {
                lists[val - 1] = idsArr[idx];
            });
        }
        // remove duplicates
        duplicates.forEach((dupIdx) => {
            focusableArr.splice(dupIdx, 1);
            lists.splice(dupIdx, 1);
        });
        return lists;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxTabbingComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: ZluxTabbingComponent, selector: "zlux-tab-trap", inputs: { hiddenIds: "hiddenIds", hiddenPos: "hiddenPos" }, host: { listeners: { "window:keydown.tab": "tabToNext($event)", "window:keydown.shift.tab": "tabToPrev($event)", "window:focusin": "syncActiveTab($event.target)" } }, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxTabbingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'zlux-tab-trap',
                    template: '',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { hiddenIds: [{
                type: Input
            }], hiddenPos: [{
                type: Input
            }], tabToNext: [{
                type: HostListener,
                args: ['window:keydown.tab', ['$event']]
            }], tabToPrev: [{
                type: HostListener,
                args: ['window:keydown.shift.tab', ['$event']]
            }], syncActiveTab: [{
                type: HostListener,
                args: ['window:focusin', ['$event.target']]
            }] } });
export class ZluxTabbingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxTabbingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: ZluxTabbingModule, declarations: [ZluxTabbingComponent], imports: [CommonModule], exports: [ZluxTabbingComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxTabbingModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxTabbingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxTabbingComponent],
                    declarations: [ZluxTabbingComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy96bHV4LXdpZGdldHMvc3JjL2xpYi9jb21wb25lbnRzL3RhYmJpbmcvdGFiYmluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7Ozs7Ozs7O0VBUUU7QUFDRixPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQTZCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRS9DLG9GQUFvRjtBQUNwRixzRUFBc0U7QUFLdEUsTUFBTSxPQUFPLG9CQUFvQjtJQVcvQixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBVGpDLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUl4QixpQkFBWSxHQUFrQixFQUFFLENBQUM7UUFDakMsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUkzQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUMvRCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBbUI7UUFDNUIsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMs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OzRGQUVELG9CQUFvQjtrQkFKaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7K0VBR1UsU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQThCTixTQUFTO3NCQURSLFlBQVk7dUJBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTzlDLFNBQVM7c0JBRFIsWUFBWTt1QkFBQywwQkFBMEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFtR3BELGFBQWE7c0JBRFosWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLGVBQWUsQ0FBQzs7QUE2RW5ELE1BQU0sT0FBTyxpQkFBaUI7K0dBQWpCLGlCQUFpQjtnSEFBakIsaUJBQWlCLGlCQXJOakIsb0JBQW9CLGFBaU5yQixZQUFZLGFBak5YLG9CQUFvQjtnSEFxTnBCLGlCQUFpQixZQUpsQixZQUFZOzs0RkFJWCxpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7aUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vKlxuICBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZVxuICBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xuICB0aGlzIGRpc3RyaWJ1dGlvbiwgYW5kIGlzIGF2YWlsYWJsZSBhdCBodHRwczovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtdjIwLmh0bWxcbiAgXG4gIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG4gIFxuICBDb3B5cmlnaHQgQ29udHJpYnV0b3JzIHRvIHRoZSBab3dlIFByb2plY3QuXG4qL1xuaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuLy9XZSBsZWF2ZSB0aGlzIGEgY29tcG9uZW50IGFuZCBub3QgYSBzZXJ2aWNlLCBhcyB0byBnaXZlIGVhY2ggY29tcG9uZW50IHRoZSBhYmlsaXR5XG4vL3RvIHNldCB0aGVpciBvd24gbWF4IHRhYnMgd2l0aG91dCBjb25mbGljdGluZyB3aXRoIG90aGVyIGNvbXBvbmVudHMuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd6bHV4LXRhYi10cmFwJyxcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBabHV4VGFiYmluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIEBJbnB1dCgpIGhpZGRlbklkczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIGhpZGRlblBvczogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgdG90YWxUYWJzO1xuICBwcml2YXRlIGFjdGl2ZVRhYjtcbiAgcHJpdmF0ZSB0YWJFdmVudDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBmb2N1c2FibGVBcnI6IEhUTUxFbGVtZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBpZEFycjogc3RyaW5nW10gPSBbXTtcbiAgcHJpdmF0ZSBwYXJlbnRSZWY6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gMDtcbiAgICB0aGlzLnRhYkV2ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5wYXJlbnRSZWYgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuaW5pdFZhbHVlcyh0aGlzLnBhcmVudFJlZik7XG4gIH1cblxuICBpbml0VmFsdWVzKGVsZVJlZjogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoZWxlUmVmKSB7XG4gICAgICB0aGlzLmZvY3VzYWJsZUFyciA9IHRoaXMuZmluZEFsbEZvY3VzYWJsZShlbGVSZWYpO1xuICAgICAgdGhpcy5pZEFyciA9IHRoaXMuZ2V0QWxsSWRzKHRoaXMuZm9jdXNhYmxlQXJyKTtcbiAgICAgIHRoaXMudG90YWxUYWJzID0gdGhpcy5mb2N1c2FibGVBcnIubGVuZ3RoO1xuICAgICAgdGhpcy50YWJFdmVudCA9IGZhbHNlO1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAwO1xuICAgICAgdGhpcy5zZXRGb2N1c0FjdGl2ZVRhYih0cnVlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi50YWInLCBbJyRldmVudCddKVxuICB0YWJUb05leHQoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnN3aXRjaFRhYih0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLnNoaWZ0LnRhYicsIFsnJGV2ZW50J10pXG4gIHRhYlRvUHJldihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3dpdGNoVGFiKGZhbHNlKTtcbiAgfVxuXG4gIHN3aXRjaFRhYihpc0ZvcndhcmQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnRhYkV2ZW50ID0gdHJ1ZTtcbiAgICBpZiAoaXNGb3J3YXJkKSB7XG4gICAgICB0aGlzLm1vdmVGb3J3YXJkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZUJhY2t3YXJkKCk7XG4gICAgfVxuICAgIHRoaXMuc2V0Rm9jdXNBY3RpdmVUYWIoaXNGb3J3YXJkKTtcbiAgfVxuXG4gIG1vdmVGb3J3YXJkKCkge1xuICAgIHRoaXMuYWN0aXZlVGFiKys7XG4gICAgaWYgKHRoaXMuYWN0aXZlVGFiID09IHRoaXMudG90YWxUYWJzKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IDA7XG4gICAgfVxuICB9XG5cbiAgbW92ZUJhY2t3YXJkKCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZVRhYiA9PSAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IHRoaXMudG90YWxUYWJzIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVUYWItLTtcbiAgICB9XG4gIH1cblxuICBzZXRGb2N1c0FjdGl2ZVRhYihpc0ZvcndhcmQ6IGJvb2xlYW4pIHtcbiAgICAvL1RPRE86IEVsZW1lbnQuZm9jdXMgc2VlbXMgdG8gZmFpbCBhdCB0aW1lcy4gTG9nZ2luZyB0aGUgZWxlbWVudCBzaG93cyBpdCBkb2VzIG5vdCAqc2VlbSogbGlrZSBhIHRpbWluZyBpc3N1ZSBmb3JcbiAgICAvL3RoZSBxdWVyeVNlbGVjdG9yIG1ldGhvZCwgYnV0IHJhdGhlciB0aGUgZm9jdXMgbWV0aG9kLCBhbmQgYWRkaW5nIGEgMjAwbXMgZGVsYXkgc2hvd2VkIHJlbGlhYmlsaXR5IHdoZW4gdGVzdGluZ1xuICAgIGlmICh0aGlzLmZvY3VzYWJsZUFycikge1xuICAgICAgbGV0IGVsZW1lbnQ6IGFueSA9IHRoaXMuZm9jdXNhYmxlQXJyW3RoaXMuYWN0aXZlVGFiXTtcbiAgICAgIGlmIChlbGVtZW50ICYmIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWxlbWVudCkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbGVtZW50RGlzYWJsZWQoZWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLnN3aXRjaFRhYihpc0ZvcndhcmQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvY3VzRWxlbWVudChlbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLmNoZWNrQW5kQWRkRWxtQWdhaW4odGhpcy5pZEFyclt0aGlzLmFjdGl2ZVRhYl0sIHRoaXMuYWN0aXZlVGFiKTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5zd2l0Y2hUYWIoaXNGb3J3YXJkKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb2N1c0VsZW1lbnQoZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNFbGVtZW50RGlzYWJsZWQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpICE9IG51bGxcbiAgfVxuXG4gIGZvY3VzRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50KSBzZXRUaW1lb3V0KCgpID0+IHsgZWxlbWVudC5mb2N1cygpOyB9LCAyMDApO1xuICB9XG5cbiAgY2hlY2tBbmRBZGRFbG1BZ2FpbihzZWxlY3Rvcjogc3RyaW5nLCBlbG1JbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3Qgcm9vdCA9IHRoaXMucGFyZW50UmVmIHx8IGRvY3VtZW50O1xuICAgIGNvbnN0IG5ld0VsbSA9IHJvb3QucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oc2VsZWN0b3IpO1xuICAgIHRoaXMuZm9jdXNhYmxlQXJyW2VsbUluZGV4XSA9IG5ld0VsbSBhcyBIVE1MRWxlbWVudDtcbiAgICByZXR1cm4gbmV3RWxtO1xuICB9XG5cbiAgZ2V0RWxlbWVudFNlbGVjdG9yKGVsbTogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgc2VsZWN0b3IgPSAnJztcbiAgICBpZiAoZWxtKSB7XG4gICAgICBzZWxlY3RvciA9IHRoaXMuZ2V0SWRTZWxlY3RvcihlbG0pO1xuICAgICAgaWYgKHNlbGVjdG9yID09ICcnKSB7XG4gICAgICAgIHNlbGVjdG9yID0gdGhpcy5nZXRBdHRyaWJ1dGVTZWxlY3RvcihlbG0pO1xuICAgICAgICBzZWxlY3RvciArPSB0aGlzLmdldENsYXNzTGlzdFNlbGVjdG9yKGVsbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuXG4gIGdldElkU2VsZWN0b3IoZWxtOiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBzZWxlY3RvciA9IGVsbS5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgJyc7XG4gICAgaWYgKHNlbGVjdG9yID4gJycpIHJldHVybiBgIyR7c2VsZWN0b3J9YFxuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuXG4gIGdldEF0dHJpYnV0ZVNlbGVjdG9yKGVsbTogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBhdHRyOiBzdHJpbmcgPSBlbG0uYXR0cmlidXRlc1swXS5uYW1lO1xuICAgIGNvbnN0IHZhbCA9IGVsbVthdHRyXSB8fCAnJztcbiAgICBjb25zdCBzZWxlY3RvciA9IGBbJHthdHRyfT0nJHt2YWx9J11gO1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuXG4gIGdldENsYXNzTGlzdFNlbGVjdG9yKGVsbTogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9ICcuJyArIEFycmF5LnByb3RvdHlwZS5qb2luLmNhbGwoZWxtLmNsYXNzTGlzdCwgJywuJykgfHwgJyc7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmZvY3VzaW4nLCBbJyRldmVudC50YXJnZXQnXSlcbiAgc3luY0FjdGl2ZVRhYihlbG06IEhUTUxFbGVtZW50KSB7XG4gICAgLy9mb2N1c2luIHRyaWdnZXJlZCBiZWNhdXNlIG9mIHN3aXRjaCB0YWIgbm90IGZyb20gaW5wdXQgY2xpY2tcbiAgICAvL25vIGFjdGl2ZVRhYiBzeW5jIHJlcXVpcmVkXG4gICAgaWYgKHRoaXMudGFiRXZlbnQpIHtcbiAgICAgIHRoaXMudGFiRXZlbnQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hY3RpdmVUYWIgPSB0aGlzLmV4dHJhY3RUYWJJZChlbG0pXG4gIH1cblxuICBleHRyYWN0VGFiSWQoZWxtOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuZm9jdXNhYmxlQXJyKSB7XG4gICAgICBjb25zdCB0YWJJZCA9IHRoaXMuZm9jdXNhYmxlQXJyLmZpbmRJbmRleChlID0+IHsgcmV0dXJuIGVsbSA9PSBlIH0pO1xuICAgICAgaWYgKHRhYklkICYmIHRhYklkID4gMCkge1xuICAgICAgICByZXR1cm4gdGFiSWQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFjdGl2ZVRhYjtcbiAgfVxuXG4gIGZpbmRBbGxGb2N1c2FibGUoZG9tUmVmOiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBsaXN0czogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICAgIGlmIChkb21SZWYgJiYgZG9tUmVmWydxdWVyeVNlbGVjdG9yQWxsJ10gIT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2VsZWN0b3JTdHIgPSAnYnV0dG9uLCBbaHJlZl0sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSknO1xuICAgICAgbGlzdHMgPSBBcnJheS5mcm9tKGRvbVJlZi5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihzZWxlY3RvclN0cikpO1xuICAgICAgbGlzdHMgPSBsaXN0cy5zb3J0KChlbG0xOiBhbnksIGVsbTI6IGFueSkgPT4ge1xuICAgICAgICBsZXQgdGFiMSA9IHBhcnNlSW50KGVsbTEuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKSB8fCAwO1xuICAgICAgICBsZXQgdGFiMiA9IHBhcnNlSW50KGVsbTIuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKSB8fCAwO1xuICAgICAgICByZXR1cm4gdGFiMiAtIHRhYjE7XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAodGhpcy5oaWRkZW5Qb3MpIHtcbiAgICAgIHRoaXMuaGlkZGVuUG9zLnNwbGl0KCcsJykubWFwKHZhbCA9PiBwYXJzZUludCh2YWwpKS5mb3JFYWNoKCh2YWwpID0+IHtcbiAgICAgICAgbGlzdHMuc3BsaWNlKHZhbCAtIDEsIDApO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdHM7XG4gIH1cblxuICBnZXRBbGxJZHMoZm9jdXNhYmxlQXJyOiBIVE1MRWxlbWVudFtdKSB7XG4gICAgbGV0IGxpc3RzOiBhbnlbXSA9IFtdO1xuICAgIGxldCBkdXBsaWNhdGVzOiBhbnlbXSA9IFtdO1xuXG4gICAgbGlzdHMgPSBmb2N1c2FibGVBcnIubWFwKGVsbSA9PiB0aGlzLmdldEVsZW1lbnRTZWxlY3RvcihlbG0pKTtcblxuICAgIGlmICh0aGlzLmhpZGRlblBvcyAmJiB0aGlzLmhpZGRlbklkcykge1xuICAgICAgY29uc3QgaWRzQXJyID0gdGhpcy5oaWRkZW5JZHMuc3BsaXQoJywnKS5tYXAocyA9PiBgIyR7c31gKTtcbiAgICAgIGxpc3RzLmZvckVhY2goKHNlbGVjdG9yLCBpZHg6IGFueSkgPT4ge1xuICAgICAgICBpZiAoaWRzQXJyLmluZGV4T2Yoc2VsZWN0b3IpID49IDApIHtcbiAgICAgICAgICBkdXBsaWNhdGVzLnB1c2goaWR4KTtcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgdGhpcy5oaWRkZW5Qb3Muc3BsaXQoJywnKS5tYXAodmFsID0+IHBhcnNlSW50KHZhbCkpLmZvckVhY2goKHZhbCwgaWR4KSA9PiB7XG4gICAgICAgIGxpc3RzW3ZhbCAtIDFdID0gaWRzQXJyW2lkeF07XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkdXBsaWNhdGVzXG4gICAgZHVwbGljYXRlcy5mb3JFYWNoKChkdXBJZHgpID0+IHtcbiAgICAgIGZvY3VzYWJsZUFyci5zcGxpY2UoZHVwSWR4LCAxKTtcbiAgICAgIGxpc3RzLnNwbGljZShkdXBJZHgsIDEpO1xuICAgIH0pXG5cbiAgICByZXR1cm4gbGlzdHM7XG4gIH1cblxuXG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbWmx1eFRhYmJpbmdDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtabHV4VGFiYmluZ0NvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgWmx1eFRhYmJpbmdNb2R1bGUgeyB9XG5cbi8qXG4gIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXG4gIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXG4gIHRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxuICBcbiAgU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcbiAgXG4gIENvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cbiovXG4iXX0=