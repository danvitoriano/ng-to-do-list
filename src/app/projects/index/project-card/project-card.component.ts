import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../projects.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input()
  project: Project;

  editMode: boolean;

  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      name: this.project.name,
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  save() {
    if (
      this.editForm.get('name').value.trim() !== '' &&
      this.editForm.get('name').value !== this.project.name
    )
      this.projectsService.updateProject(this.project.id, this.editForm.value)

    this.toggleEdit();
  }

  delete() {
    this.projectsService.deleteProject(this.project.id);
  }
}