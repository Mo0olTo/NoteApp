import { Component, inject, OnInit } from '@angular/core';
import { NoteService } from '../../core/services/note/note.service';
import { Inotes } from '../../shared/interfaces/inotes';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notes',
  imports: [DatePipe], 
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {

  private readonly noteService=inject(NoteService)



  notesData:Inotes[]=[]



  ngOnInit(): void {
      this.getNotes()
  }

  getNotes():void{
    this.noteService.getUserNotes().subscribe({
      next:(res)=>{
        console.log(res);
        this.notesData=res.notes
        
      }
    })
  }

}
