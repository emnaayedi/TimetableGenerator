import { Component, ElementRef, Input, OnInit,ViewChild, OnDestroy,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SeanceService } from '../shared/seance.service';
import { NiveauService } from '../shared/niveau.service';
import { GroupeService } from '../shared/groupe.service';
import { FiliereService } from '../shared/filiere.service';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { MatiereService } from '../shared/matiere.service';
import { EnseignantService } from '../shared/enseignant.service';
import { ClasseService } from '../shared/Classe.service';
import { SalleService } from '../shared/salle.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Router } from '@angular/router';
import { findIndex, find } from 'rxjs/operators';
import { removeData } from 'jquery';
import { fingerprint } from '@angular/compiler/src/i18n/digest';
import { Evenement } from 'src/models/evenement';
interface DialogData {
  email: string;
  
}

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css']
})
export class SeanceComponent implements OnInit , OnDestroy {
  private evenement:Evenement[];
  seanceForms : FormArray = this.fb.array([]);
  seanceList= [];
  notification = null;
  niveau: string[];  
  jour:string[];
    groupe: string[];  
    filiere: string[];  
    seance: string[];
    matiere:string[];
    enseignant:string[];
    salle:string[];
    classe: string[];  
   static repeat: number=0;
    static nom:string;
    static code:number;
    static nomGroup:string;
    static idGroup:number;
    static niveau:number;
    static valueN:number;    
  static nomFil:string;
  static codeFil:number;
  static nomEns:string;
  static codeEns:number;
  static nomMat:string;
  static codeMat:number;
  static nomSal:string;
  static codeSal:number;
  static x1:boolean=false;
  static x2:boolean=false;
  static x3:boolean=false;
  static x4:boolean=false;
  static x5:boolean=false;
  static x6:boolean=false;
  static x7:boolean=false;
  static x8:boolean=false;
  static x9:boolean=false;

  change:boolean=false;


  SeanceComponent = SeanceComponent;
  static h: number=0;

  constructor(private classeService:ClasseService,private salleService:SalleService,private enseignantService:EnseignantService,private fb: FormBuilder ,private matiereService:MatiereService,private niveauService : NiveauService,private seanceService : SeanceService,private groupeService : GroupeService, private filiereService : FiliereService,
    public dialogRef: MatDialogRef<SeanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private router: Router) { 
      this.router.routeReuseStrategy.shouldDetach(undefined);
}


  onNoClick(): void {
    this.dialogRef.close();
  }

    ngOnInit(): void {
      this.salleService.getSalleList().subscribe(  
        data => {  
         this.salle = data as string [];  
        }  
      );  
      this.enseignantService.getEnseignantList().subscribe(  
        data => {  
         this.enseignant = data as string [];  
        }  
      );  
      this.groupeService.getGroupeList().subscribe(  
        data => {  
         this.groupe = data as string [];  
        }  
      );  
   
      this.classeService.getClasseList().subscribe(  
        data => {  
         this.classe = data as string [];  
        }  
      ); 
      this.niveauService.getNiveauList().subscribe(  
        data => {  
         this.niveau = data as string [];  
        }  
      );     
      this.filiereService.getFiliereList().subscribe(  
        data => {  
         this.filiere = data as string [];  
        }  
      );  
      this.seanceService.getJoursList()
      .subscribe(
        data => {  
         this.jour = data as string [];  
        }  
      );  
      this.seanceService.getSeanceList().then(  
      
        data => {    (data['_embedded']['evenements']).forEach((seance: any) =>{
          this.seanceForms.push(this.fb.group({
           Id : [seance.id],
           Titre : [seance.titre],
           Lieu: [seance.lieu],
           Date : [seance.date],
          
          }));});});
     
  
    }
    ngOnDestroy(): void {
      throw new Error("Method not implemented.");
    }
    
    addSeanceForms(){
     
     this.seanceForms.push(this.fb.group({
      Id : [0],
         Titre : [0],
         Lieu : [0],
        Date : [ ],
     }));}
    
  recordSubmit(fg : FormGroup){
    if (fg.value.Id == 0){


      this.seanceService.PostSeanceList(fg.value)
             .then((res : any) => {
                 fg.patchValue({Id :res.id})
                 this.showNotification('insert');
                 console.log("fg.value", fg.value);
 
             });}
     else{
     this.seanceService.PutSeanceList(fg.value).then((res: any) => {
         this.showNotification('update');
       }); }
  
  }

  onDelete(IdSeance, i) {
   if (IdSeance == 0)
     this.seanceForms.removeAt(i);
   else if (confirm('Are you sure to delete this record ?'))
     this.seanceService.deleteSeanceList(IdSeance).then(
       res => {
         this.seanceForms.removeAt(i);
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
    
     }
     public SearchJour($event) {
       SeanceComponent.x1=true;
      let id = $event.target.options[$event.target.options.selectedIndex].text;
      SeanceComponent.nom=id;
      SeanceComponent.code=parseInt($event.target.value);
      let xcode=$event.target.value;
      console.log(SeanceComponent.code);
      return xcode;
    
    }
   
    public SearchFil($event) {  
      SeanceComponent.x2=true;
      let id = $event.target.options[$event.target.options.selectedIndex].text;
      SeanceComponent.nomFil=id;
      SeanceComponent.codeFil=parseInt($event.target.value);
      let xcode=$event.target.value;
      console.log(SeanceComponent.codeFil);

      return xcode;
    
    }
    public SearchGroup($event) {
      SeanceComponent.x3=true;
      let id = $event.target.options[$event.target.options.selectedIndex].text;
      SeanceComponent.nomGroup=id;
      SeanceComponent.idGroup=parseInt($event.target.value);
      let xcode=$event.target.value;
      console.log(SeanceComponent.idGroup);
      return xcode;
    
    }
    
    public SearchNiveau($event){
      SeanceComponent.x4=true;
     let id = $event.target.options[$event.target.options.selectedIndex].text;
     SeanceComponent.niveau=id;
     SeanceComponent.valueN=parseInt($event.target.value);
      let xcode=$event.target.value;
      console.log(SeanceComponent.valueN);
      return xcode;
    }
    public SearchEns($event) {  
      SeanceComponent.x5=true;
      let id = $event.target.options[$event.target.options.selectedIndex].text;
      SeanceComponent.nomEns=id;
      SeanceComponent.codeEns=parseInt($event.target.value);
      let xcode=$event.target.value;
      console.log(SeanceComponent.codeEns);
      return xcode;
    
    }
    public SearchSal($event) {  
      SeanceComponent.x6=true;
      let id = $event.target.options[$event.target.options.selectedIndex].text;
      SeanceComponent.nomSal=id;
      SeanceComponent.codeSal=parseInt($event.target.value);
      let xcode=$event.target.value;
 
      return xcode;
    
    }
    public SearchMat($event) {  
      SeanceComponent.x7=true;
      let id = $event.target.options[$event.target.options.selectedIndex].text;
      SeanceComponent.nomMat=id;
      SeanceComponent.codeMat=parseInt($event.target.value);
      let xcode=$event.target.value;
 
      return xcode;
    
    }
    public SearchDebut() {  
      SeanceComponent.x8=true;
     this.change=true;
      return SeanceComponent.x8;
      
    
    }
    public SearchFin() {  
      SeanceComponent.x9=true;
      this.change=true;
      return SeanceComponent.x9;
    
    }
}
