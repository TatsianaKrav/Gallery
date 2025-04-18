import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { CharacterFormComponent } from './form/character-form.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CharacterModel } from '../../models/character-model';
import { ModalActionsComponent } from './modal-actions/modal-actions.component';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CharacterFormComponent, ModalActionsComponent],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss'
})
export class ModalContainerComponent implements OnInit {
  public characterResponse: CharacterModel | null = null;

  constructor(public themeService: ThemeService,
    private dynamicDialogConfig: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    this.characterResponse = this.dynamicDialogConfig.data;
  }
}
