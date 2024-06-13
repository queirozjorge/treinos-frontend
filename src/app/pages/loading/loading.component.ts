import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgxSpinnerModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit{

  constructor(private spinner: NgxSpinnerService) {}
  
  ngOnInit(): void {
    this.spinner.show();
  }
  
}
