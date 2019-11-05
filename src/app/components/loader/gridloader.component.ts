import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-grid-loader',
    templateUrl: './gridloader.component.html',
    styleUrls: ['./gridloader.component.css'],
})
export class GridLoaderComponent {
    @Input() color = '#7f58af';
}
