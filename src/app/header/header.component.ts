import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() selectedNavItem = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onSelect(navItem: string) {
    this.selectedNavItem.emit(navItem);
  }
}
