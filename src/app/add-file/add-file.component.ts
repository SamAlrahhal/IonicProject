import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedEventsService } from '../shared-events.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent {
  fileForm = this.fb.group({
    filename: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private serviceEvent: SharedEventsService
  ) {}

  get filename() {
    return this.fileForm.get('filename');
  }

  addFile() {
    if (this.fileForm.valid) {
      this.serviceEvent.makeFileEvent.emit(this.filename?.value);
      this.filename?.setValue('');
    }
  }
}
