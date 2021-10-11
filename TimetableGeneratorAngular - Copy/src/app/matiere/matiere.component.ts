import { Component, OnInit, ViewChild} from '@angular/core';
import { MatiereService } from '../shared/matiere.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FiliereService } from '../shared/filiere.service';
import { MatModService } from '../shared/mat-mod.service';

import { Matiere }        from './matiere';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NiveauService } from '../shared/niveau.service';
import { ModuleService } from '../shared/module.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  filierForms : FormArray = this.fb.array([]);
  matiereForms : FormArray = this.fb.array([]);
  filiereList = [];
  moduleList = [];
  niveauList =[];
  matiereList =[];
  notification = null;
  static niveau:number;
  static fil:number;
  static mod:number;
  static open: boolean=false;
  static selectFil:boolean=false;
  static selectNiv:boolean=false;
  static selectMod:boolean=false;

  MatiereComponent = MatiereComponent;

  openAff:boolean =false;
  close:boolean =true;
  static val: number;
  isHiddenMat: boolean =false;

  static repeat: number=0;

  constructor(private fb: FormBuilder ,
    private niveauService : NiveauService,
    private moduleService : ModuleService,  
    private matiereService : MatiereService,
    private matModService: MatModService,
    private filiereService : FiliereService ,private router: Router) { 
      this.router.routeReuseStrategy.shouldDetach(undefined);
}
  ngOnInit() {
    this.filiereService.getFiliereList()
    .subscribe(res => {
    
      {
       //generate formarray as per the data received from Filiere table
       (res as []).forEach((filiere: any) => {
         this.filierForms.push(this.fb.group({
           CodeFil : [filiere.codeFil],
           NomFil : [filiere.nomFil,Validators.required]
         }));
       });
     }
   }
 );  

    this.filiereService.getFiliereList().subscribe(  
      data => {  
       this.filiereList = data as [];  
          }  
    );

    this.moduleService.getFiliereList().subscribe(  
      data => {  
       this.moduleList = data as [];  
      }  
    );  

    this.niveauService.getNiveauList().subscribe(  
      data => {  
       this.niveauList = data as  []; 
       
      }  
    );  

   

    this.matiereService.getMatiereList().then(  
      
      data => {   (data['_embedded']['publications']).forEach((matiere: any) => {
        this.matiereForms.push(this.fb.group({
         id : [matiere.id],
         titre : [matiere.titre],
         lien : [matiere.lien ],
        dateApparition : [matiere.dateApparition ],
        type:[matiere.type],
        sourcePdf:[matiere.sourcePdf],

    }));
  
    
  
 setTimeout(() => {
  this.notification = null;
}, 1000);


});});
  }

  addMatiereForms(){
    this.matiereForms.push(this.fb.group({
      id : [0],
      titre : ['',Validators.required],
    sourcePdf : ['',Validators.required],
   lien : ['',Validators.required],
   dateApparition: ['',Validators.required],
   type: ['',Validators.required],
    }));
  }

  recordSubmit(fg : FormGroup){
    if (fg.value.id == 0){


      this.matiereService.PostMatiereList(fg.value)
             .then((res : any) => {
               console.log(res);
                 fg.patchValue({id :res['id']});
                 this.showNotification('insert');
                 console.log("fg.value", fg.value);
 
             });}
     else{
     this.matiereService.PutMatiereList(fg.value).then((res: any) => {
      console.log(res);
         this.showNotification('update');
       }); }
  
  }

  onDelete(id, i) {
    if (id== 0)
      this.matiereForms.removeAt(i);
    else if (confirm('Are you sure to delete this record ?'))
      this.matiereService.deleteMatiereList(id).then(
       (res: any)=> {
         console.log(res);
          this.matiereForms.removeAt(i);
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



  
openDialogAffichier(x:number){
  this.matiereForms.clear();
  for(let i=0;i<this.matiereList.length;i++){
    if (this.matiereList[i].codeFil==x){

      this.matiereForms.push(this.fb.group({

              CodeMat : [this.matiereList[i].codeMat,Validators.required],
              NomMat : [this.matiereList[i].nomMat,Validators.required],
              NbHeuresCours : [this.matiereList[i].nbHeuresCours,Validators.required],
              NbHeuresTd : [this.matiereList[i].nbHeuresTd,Validators.required],
              NbHeuresTp : [this.matiereList[i].nbHeuresTp,Validators.required],
             // CodeFil : [this.matiereList[i].codeFil, Validators.required],
              IdNiv : [this.matiereList[i].idNiv, Validators.required],
              IdMod : [this.matiereList[i].idMod, Validators.required]

      }));
    }
} 
MatiereComponent.val=x;

if(this.openAff==false){
  this.openAff=true;
}

//this.openAff=true;

 if (this.close==false){
  this.close=true;
}
console.log(this.close);

     return this.matiereForms;

}

/**************************************************************** */

onNoClick(){
  if (this.close==true){
      this.close=false;
  }
  
  this.openAff=true;


}


}














//   ItemsArray= [];
//   constructor( private matiereService : MatiereService) { }


//   ngOnInit(): void {
//     this.matiereService.getUsers().subscribe((res: any[])=>{
//       this.ItemsArray= res;
//     })    }
//   term: string;

  
  
// }