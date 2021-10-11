import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { SalleService } from '../shared/salle.service';


@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit {

  salleForms : FormArray = this.fb.array([]);
  salleList= [];
  notification = null;

  constructor(private fb: FormBuilder , private salleService : SalleService) { }

  ngOnInit(){
    this.salleService.getAllOutil()
    .subscribe(res => {
      console.log((Array.isArray(res as [])));

    /* if (res == []){
          this.addSallesForms();
        }
     else {
       
       (res as []).forEach((salle: any) => {
         this.salleForms.push(this.fb.group({
           IdOutil:[salle.id],
           DateOutil : [salle.date],
           Source : [salle.source,Validators.required]
         }));
       });

     }*/
   }
 );  
  }
  addSallesForms(){
    this.salleForms.push(this.fb.group({
      IdOutil:[0],
      DateOutil:[0],
      Source: ['',Validators.required]
    }));
  }

  recordSubmit(fg : FormGroup){
    if (fg.value.IdOutil == 0){


     this.salleService.PostOutilList(fg.value)
            .subscribe((res : any) => {
                fg.patchValue({IdOutil :res.id})
                this.showNotification('insert');
                console.log("fg.value", fg.value);

            });}
    else{
    this.salleService.PutOutilList(fg.value).subscribe((res: any) => {
        this.showNotification('update');
      });
  }}

  onDelete(NumSal, i) {
    if (NumSal == 0)
      this.salleForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.salleService.deleteOutilList(NumSal).subscribe(
        res => {
          this.salleForms.removeAt(i);
          this.showNotification('delete');
        });
  }

  showNotification(category) {
    switch (category) {
      case 'insert':
        this.notification = { class: 'text-success', message: 'saved!' };
        break;
      case 'update':
        this.notification = { class: 'text-primary', message: 'updated!' };
        break;
      case 'delete':
        this.notification = { class: 'text-danger', message: 'deleted!' };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

}