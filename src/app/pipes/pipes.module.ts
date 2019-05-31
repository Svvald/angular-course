import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DurationPipe } from './duration-pipe/duration.pipe';
import { OrderByPipe } from './orderby-pipe/orderby.pipe';

@NgModule({
    declarations: [
        OrderByPipe,
        DurationPipe,
    ],
    imports: [ CommonModule ],
    exports: [
        OrderByPipe,
        DurationPipe,
    ],
    providers: [
        OrderByPipe,
    ],
})
export class PipesModule {}
