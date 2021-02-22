import { Subject } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';

@Directive()
export abstract class AbstractPageDirective implements OnDestroy {
	protected destroy$: Subject<void> = new Subject<void>(); // responsible for preserving memory leak

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}