import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import Swal from 'sweetalert2';  // Import de SweetAlert2
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  newCourse = { title: '', image: '', price: null };
  courses: any[] = [];
  filteredCourses: any[] = []; // Liste des cours filtrés
  selectedCourse: any = null;  
  searchQuery: string = ''; // Texte de recherche

  constructor(private courseService: CourseService) {}

  async ngOnInit() {
    try {
      this.courses = await this.courseService.getCourses();
      this.filteredCourses = [...this.courses]; // Initialiser les cours filtrés avec tous les cours
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  async addCourse() {
    try {
      const createdCourse = await this.courseService.createCourse(this.newCourse);
      this.courses.push(createdCourse);
      this.filteredCourses.push(createdCourse); // Ajouter le cours à la liste filtrée également
      this.newCourse = { title: '', image: '', price: null };
  
      // Affichage d'une alerte de succès
      Swal.fire({
        icon: 'success',
        title: 'Course Added!',
        text: 'The course has been added successfully.',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.error('Error adding course:', error);
  
      // Affichage d'une alerte en cas d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Something went wrong while adding the course.',
        confirmButtonText: 'Ok'
      });
    }
  }

  async deleteCourse(courseId: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await this.courseService.deleteCourse(courseId);
        this.courses = this.courses.filter(course => course.id !== courseId);
        this.filteredCourses = this.filteredCourses.filter(course => course.id !== courseId); // Supprimer du tableau filtré aussi
        Swal.fire(
          'Deleted!',
          'The course has been deleted.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting course:', error);
        Swal.fire(
          'Error!',
          'Something went wrong while deleting the course.',
          'error'
        );
      }
    }
  }

  selectCourse(course: any) {
    this.selectedCourse = { ...course };
  }

  async updateCourse() {
    if (this.selectedCourse) {
      try {
        const updatedCourse = await this.courseService.updateCourse(this.selectedCourse.id, this.selectedCourse);
        const index = this.courses.findIndex(course => course.id === updatedCourse.id);
        this.courses[index] = updatedCourse;
        this.selectedCourse = null;
  
        // Mise à jour des cours filtrés
        this.filteredCourses = this.courses.filter(course => course.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
  
        Swal.fire({
          icon: 'success',
          title: 'Course Updated!',
          text: 'The course has been updated successfully.',
          confirmButtonText: 'Ok'
        });
      } catch (error) {
        console.error('Error updating course:', error);
  
        // Affichage d'une alerte en cas d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Something went wrong while updating the course.',
          confirmButtonText: 'Ok'
        });
      }
    }
  }

  // Fonction de filtrage des cours
  filterCourses() {
    this.filteredCourses = this.courses.filter(course => 
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
