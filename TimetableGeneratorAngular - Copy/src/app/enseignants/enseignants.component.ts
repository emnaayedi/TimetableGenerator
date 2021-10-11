import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EnseignantService } from '../ENS/enseignant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enseignants',
  templateUrl: './enseignants.component.html',
  styleUrls: ['./enseignants.component.css']
})
export class EnseignantsComponent implements OnInit {

  enseignantForms : FormArray = this.fb.array([]);
  enseignantList= [];
  notification = null;


  constructor(private fb: FormBuilder , private router: Router,private enseignantService : EnseignantService) {    this.router.routeReuseStrategy.shouldDetach(undefined);}

  ngOnInit() {

      this.enseignantService.getEnseignantList()
       .subscribe(res => {
        if (res == [])
             this.addEnseignantForms();
        else {
          //generate formarray as per the data received from BankAccont table
          (res as []).forEach((enseignant: any) => {
            this.enseignantForms.push(this.fb.group({
              IdEns : [enseignant.idEns],
              NomEns : [enseignant.nomEns,Validators.required],
              PrenomEns : [enseignant.prenomEns,Validators.required],
              GradeEns : [enseignant.gradeEns,Validators.required],
              NbHeure : [enseignant.nbHeure]
            }));
          });
        }
      }
    );  
  }

  addEnseignantForms(){
    this.enseignantForms.push(this.fb.group({
      IdEns : [0],
      NomEns : ['',Validators.required],
      PrenomEns : ['',Validators.required],
      GradeEns : ['',Validators.required],
      NbHeure : ['',Validators.required]
    }));
  }

  recordSubmit(fg : FormGroup){
    
    if (fg.value.IdEns == 0)
{
  
     this.enseignantService.PostEnseignantList(fg.value)
            .subscribe((res : any) => {
              fg.patchValue({IdEns :res.idEns});
              this.showNotification('insert');

            });
            
          }
    else
    this.enseignantService.PutEnseignantList(fg.value).subscribe(
      (res: any) => {
        this.showNotification('update');
      });
  }

  onDelete(IdEns, i) {
    if (IdEns == 0)
      this.enseignantForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.enseignantService.deleteEnseignantList(IdEns).subscribe(
        res => {
          this.enseignantForms.removeAt(i);
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
