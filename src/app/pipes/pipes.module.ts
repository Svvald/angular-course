import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderByPipe } from './orderby-pipe/orderby.pipe';
import { DurationPipe } from './duration-pipe/duration.pipe';
import { FilterPipe } from './filter-pipe/filter.pipe';

@NgModule({
    declarations: [
        OrderByPipe,
        DurationPipe,
        FilterPipe
    ],
    imports: [ CommonModule ],
    exports: [
        OrderByPipe,
        DurationPipe,
        FilterPipe
    ],
    providers: [
        OrderByPipe,
        FilterPipe
    ],
})
export class PipesModule {}