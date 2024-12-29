import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private API_URL = 'http://localhost:8080/api/courses';

  async getCourses() {
    try {
      const response = await axios.get(this.API_URL);
      return response.data;  // Return the data (list of courses)
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;  // Propagate the error so it can be handled in the component
    }
  }

  async createCourse(course: any) {
    const response = await axios.post(this.API_URL, course);
    return response.data;
  }

  async updateCourse(id: number, course: any) {
    try {
        const response = await axios.put(`${this.API_URL}/${id}`, course);
        return response.data;
    } catch (error) {
        console.error('Error updating course:', error);
        throw error;
    }
}

  async deleteCourse(id: number) {
    await axios.delete(`${this.API_URL}/${id}`);
  }
  
}
