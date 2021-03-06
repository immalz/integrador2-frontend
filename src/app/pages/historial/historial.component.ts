import { HistorialService } from './../../services/historial.service';
import { UserService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface UserData {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-records',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class RecordsComponent implements AfterViewInit  {

  displayedColumns: string[] = ['date', 'module', 'description','responsible'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    private historialService: HistorialService
  ) {
    this.dataSource = new MatTableDataSource();
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getRecords();
  }

  downloadPDF() {
    const DATA: HTMLElement = document.getElementById('htmlData')!;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_historial.pdf`);
    });
  }


  getRecords(): void{
    this.historialService.getHistory().subscribe(
      (res: any) => {
        console.log(res)
        this.dataSource.data = res.reverse();
      }
    )
  }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
