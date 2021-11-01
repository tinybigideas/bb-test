import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';

const endpoint = 'https://example.com/api/items';

@Component({
  selector: 'autocomplete-input',
  template: `
    <div class="wrapper">
      <div class="control" [class.is-loaded]="hasItems">
        <input #input type="text" class="input" />
      </div>
      <div *ngIf="hasItems && !loading" class="list is-hoverable">
        <a *ngFor="let item of autoCompleteList" class="list-item" (click)="onSelectValue($event)">
          {{ item }}
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class AutocompleteComponent implements AfterViewInit {
  @Output() public onSelect = new EventEmitter<string>();
  @ViewChild('input') private input!: ElementRef;

  public searchQuery: string | undefined;
  public autoCompleteList: string[] = [];
  public loading = false;

  private unsub$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  public ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.autoCompleteList = [];
          this.loading = true;
        }),
        switchMap(({ target }) => this._getItemsByQuery((target as HTMLInputElement)?.value)),
        takeUntil(this.unsub$)
      )
      .subscribe(
        (items) => {
          this.loading = false;
          this.autoCompleteList = items;
        },
        (err: any) => {
          this.loading = false;
          this.autoCompleteList = [];
        }
      );
  }

  public onSelectValue({ target }: Event): void {
    this.onSelect.emit((target as HTMLInputElement)?.value);
  }

  public get hasItems(): boolean {
    return this.autoCompleteList.length > 0;
  }

  public ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  private _getItemsByQuery(query: string): Observable<string[]> {
    return of(['test', 'tester', 'testy', 'what']);
    // return this.http.get(`${endpoint}/q=${query}`) as Observable<string[]>;
  }
}
