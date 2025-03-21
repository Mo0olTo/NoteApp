import { FlowbiteService } from './../../core/services/flowbite/flowbite.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from './../../core/services/note/note.service';
import { Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild,  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { Inotes } from '../../shared/interfaces/inotes';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly noteService=inject(NoteService)
  private readonly formBuilder=inject(FormBuilder)
  private readonly toastrService=inject(ToastrService)
  private readonly router=inject(Router)
  
  
    private readonly plat_id=inject(PLATFORM_ID)

    @ViewChild("updateModal") myEl!:ElementRef;
    
  


    
    userNotes:Inotes[]=[]
    noteId:string='';


  noteForm:FormGroup=this.formBuilder.group({
    title:[null,[Validators.required]],
    content:[null , [Validators.required]]
  })
  updateForm:FormGroup=this.formBuilder.group({
    title:[null,[Validators.required]],
    content:[null , [Validators.required]]
  })



  constructor(private FlowbiteService: FlowbiteService) {}



  ngOnInit(): void {

    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if(isPlatformBrowser(this.plat_id)){
      if(localStorage.getItem("userToken")!== null){
        this.getUserNotes();  
      }
    }
  
  }



  submitAddForm():void{
    this.noteService.addNote(this.noteForm.value).subscribe({
      next:(res)=>{

        if(res.msg==="done"){
          this.toastrService.success(res.msg , "Your Note Added")


        }
        console.log(res);
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }


  getUserNotes():void{
    this.noteService.getUserNotes().subscribe({
      next:(res)=>{
        console.log(res);

        this.userNotes=res.notes
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }


  noteData(note:Inotes , id:string):void{
    this.noteId=id
    this.updateForm.patchValue(note)

  }


  submitUpdateForm():void{
    this.noteService.updateUserNote( this.noteId , this.updateForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.closeModal();
        this.getUserNotes();
        
      }
    })
  }



  showModal():void{
    const modal =this.myEl
    console.log(modal);
    modal.nativeElement.classList.remove("hidden")
    
  }


  closeModal():void{
    this.myEl.nativeElement.classList.add('hidden')
  }



  deleteNote(id:string):void{
    this.noteService.deleteUserNote(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUserNotes()
      }
    })
  }




}
