// Localstorage service question

import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './localstorage.service';

@Component({
  selector: 'app-q1',
  templateUrl: './q1.component.html',
  styleUrls: ['./q1.component.scss']
})
export class Q1Component implements OnInit {
  constructor(private ls: LocalStorageService) {}

  public ngOnInit(): void {
    this.ls.list().subscribe(console.log); //prints Map(1) {"a" => "b"}
    console.log(this.ls.add('key', 'value')); //prints true; Observable from first line emits {"a" => "b", "key" => "value"}
    console.log(this.ls.add('key', 'value')); //prints false; Observable from first doesn't emit
    console.log(this.ls.update('key', 'value1')); //prints "value"; Observable from first line emits {"a" => "b", "key" => "value1"}
    console.log(this.ls.remove('a')); //prints "b"; Observable from first line emits {"key" => "value1"}
    console.log(this.ls.get('key')); //prints "value1"; Observable from first doesn't emit
    this.ls.list().subscribe(console.log); //prints Map(1) {"key" => "value1"}
  }
}
