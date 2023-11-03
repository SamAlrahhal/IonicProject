import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent {
  fileForm = this.fb.group({
    filename: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  get filename() {
    return this.fileForm.get('filename');
  }

  addFile() {
    if (this.fileForm.valid) {
      // Perform the button operation here
      console.log('File added successfully');
    }
  }
}
