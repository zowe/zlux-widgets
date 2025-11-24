/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { NgModule, Directive, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
// import '../../assets/css/inputtext.css';
export class ZluxInputText {
    constructor() {
        this.dark = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxInputText, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.14", type: ZluxInputText, selector: "[zluxInputText]", inputs: { dark: "dark" }, host: { properties: { "class.text-input": "true", "class.text-input-dark": "dark" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxInputText, decorators: [{
            type: Directive,
            args: [{
                    selector: '[zluxInputText]',
                    host: {
                        '[class.text-input]': 'true',
                        '[class.text-input-dark]': 'dark'
                    },
                }]
        }], propDecorators: { dark: [{
                type: Input
            }] } });
export class ZluxInputTextModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxInputTextModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: ZluxInputTextModule, declarations: [ZluxInputText], imports: [CommonModule], exports: [ZluxInputText] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxInputTextModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ZluxInputTextModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxInputText],
                    declarations: [ZluxInputText]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXR0ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvemx1eC13aWRnZXRzL3NyYy9saWIvY29tcG9uZW50cy9pbnB1dHRleHQvaW5wdXR0ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7OztFQVFFO0FBRUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFDL0MsMkNBQTJDO0FBUzNDLE1BQU0sT0FBTyxhQUFhO0lBUDFCO1FBUVcsU0FBSSxHQUFZLEtBQUssQ0FBQztLQUNoQzsrR0FGWSxhQUFhO21HQUFiLGFBQWE7OzRGQUFiLGFBQWE7a0JBUHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsSUFBSSxFQUFFO3dCQUNKLG9CQUFvQixFQUFFLE1BQU07d0JBQzVCLHlCQUF5QixFQUFFLE1BQU07cUJBQ2xDO2lCQUNGOzhCQUVVLElBQUk7c0JBQVosS0FBSzs7QUFRUixNQUFNLE9BQU8sbUJBQW1COytHQUFuQixtQkFBbUI7Z0hBQW5CLG1CQUFtQixpQkFUbkIsYUFBYSxhQUtkLFlBQVksYUFMWCxhQUFhO2dIQVNiLG1CQUFtQixZQUpwQixZQUFZOzs0RkFJWCxtQkFBbUI7a0JBTC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLypcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXG4gIFxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICBcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxuKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUsIERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbi8vIGltcG9ydCAnLi4vLi4vYXNzZXRzL2Nzcy9pbnB1dHRleHQuY3NzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3psdXhJbnB1dFRleHRdJyxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MudGV4dC1pbnB1dF0nOiAndHJ1ZScsXG4gICAgJ1tjbGFzcy50ZXh0LWlucHV0LWRhcmtdJzogJ2RhcmsnXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFpsdXhJbnB1dFRleHQge1xuICBASW5wdXQoKSBkYXJrOiBib29sZWFuID0gZmFsc2U7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbWmx1eElucHV0VGV4dF0sXG4gIGRlY2xhcmF0aW9uczogW1psdXhJbnB1dFRleHRdXG59KVxuZXhwb3J0IGNsYXNzIFpsdXhJbnB1dFRleHRNb2R1bGUgeyB9XG5cblxuLypcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXG4gIFxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuICBcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxuKi9cblxuIl19