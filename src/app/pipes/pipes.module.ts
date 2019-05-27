import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DurationPipe } from './duration-pipe/duration.pipe';
import { FilterPipe } from './filter-pipe/filter.pipe';
import { OrderByPipe } from './orderby-pipe/orderby.pipe';

@NgModule({
    declarations: [
        OrderByPipe,
        DurationPipe,
        FilterPipe,
    ],
    imports: [ CommonModule ],
    exports: [
        OrderByPipe,
        DurationPipe,
        FilterPipe,
    ],
    providers: [
        OrderByPipe,
        FilterPipe,
    ],
})
export class PipesModule {}
