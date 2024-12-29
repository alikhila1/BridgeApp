import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  standalone: true,
  imports: [CommonModule]  // Add CommonModule to imports
})
export class LandingPageComponent implements OnInit {
  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  async ngOnInit() {
    this.courses = await this.courseService.getCourses();
  }
}
