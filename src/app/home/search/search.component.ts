import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private jobService:JobsService) { }

  ngOnInit(): void {
  }

  searchForm = new FormGroup({
    keyWord:new FormControl('',[

    ]),
    seniority: new FormControl('',[

    ]),
    minYears:new FormControl('',[

    ]),
    maxYears:new FormControl('',[

    ])
  })

  onSubmit() {
    if (this.searchForm.value.maxYears == null) {
      this.searchForm.patchValue({
        maxYears:""
      })
    }
    if (this.searchForm.value.minYears == null) {
      this.searchForm.patchValue({
        minYears: ""
      })
    }
    this.jobService.jobSubject.next(this.searchForm.value);   
  }

}
