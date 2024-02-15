import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-actor-profile',
  templateUrl: './actor-profile.component.html',
  styleUrls: ['./actor-profile.component.css']
})
export class ActorProfileComponent implements OnInit {
  actorForm!: FormGroup;
  allSkills: any = ['Skill1', 'Skill2', 'Skill3']; // Predefined skills
  allExpertise: any = ['Expertise1', 'Expertise2', 'Expertise3']; // Predefined skills
  allJobLocation: any = ['Mumbai', 'Hyderabad', 'Indore']; // Predefined skills
  allJobType: any = ['Developer', 'Tester', 'QA Analyst']; // Predefined skills
  options: any = ['Option1', 'Option2', 'Option3'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.actorForm = this.fb.group({
      currentEmploymentType: [''],
      yearsOfExperienceYears: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      yearsOfExperienceMonths: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      jobTitle: [''],
      desiredJobType: this.fb.array([]),
      desiredJobLocation: this.fb.array([]),
      jobDescription: [''],
      currentJobLocality: [''],
      clientWorkWith: [''],
      associationLicenseNumber: [''],
      skills: this.fb.array([]),
      expertise: this.fb.array([]),
      functionalIndustry: [''],
      functionalArea: [''],
      noticePeriod: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      currentPay: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]]
    });
  }

  get desiredJobTypeFormArray(): FormArray {
    return this.actorForm.get('desiredJobType') as FormArray;
  }

  addJobType(event: Event): void {
    const input = event.target as HTMLInputElement;
    const jobType = input.value.trim();
    if (jobType && !this.desiredJobTypeFormArray.value.includes(jobType)) {
      this.desiredJobTypeFormArray.push(new FormControl(jobType));
      input.value = ''; // Clear the input field
    }
  }

  removeJobType(index: number): void {
    this.desiredJobTypeFormArray.removeAt(index);
  }

  get desiredJobLocationFormArray(): FormArray {
    return this.actorForm.get('desiredJobLocation') as FormArray;
  }
  addJobLocation(event: Event): void {
    const input = event.target as HTMLInputElement;
    const jobLocation = input.value.trim();
    if (jobLocation && !this.desiredJobLocationFormArray.value.includes(jobLocation)) {
      this.desiredJobLocationFormArray.push(new FormControl(jobLocation));
      input.value = ''; // Clear the input field
    }
  }

  removeJobLocation(index: number): void {
    this.desiredJobLocationFormArray.removeAt(index);
  }


  get skillsFormArray(): FormArray {
    return this.actorForm?.get('skills') as FormArray;
  }
  addSkill(event: any): void {
    let skill = event.target.value;
    if (skill && !this.skillsFormArray?.value?.includes(skill)) {
      this.skillsFormArray?.push(new FormControl(skill));
    }
    if (!this.allSkills?.includes(skill)) {
      this.allSkills?.push(skill); // Add new skill to the list
    }
  }
  removeSkill(index: number): void {
    this.skillsFormArray.removeAt(index);
  }



  get expertiseFormArray(): FormArray {
    return this.actorForm?.get('expertise') as FormArray;
  }
  addExpertise(event: any): void {
    let expertise = event.target.value;
    if (expertise && !this.expertiseFormArray?.value?.includes(expertise)) {
      this.expertiseFormArray?.push(new FormControl(expertise));
    }
    if (!this.allExpertise?.includes(expertise)) {
      this.allExpertise?.push(expertise); // Add new skill to the list
    }
  }

  removeExpertise(index: number): void {
    this.expertiseFormArray.removeAt(index);
  }
  onSubmit() {
    console.log(this.actorForm.value);
  }
}
