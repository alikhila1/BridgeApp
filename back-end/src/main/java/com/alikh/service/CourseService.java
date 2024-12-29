package com.alikh.service;

import com.alikh.model.Course;
import com.alikh.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
    public Course updateCourse(Long id, Course updatedCourse) {
        Optional<Course> existingCourseOpt = courseRepository.findById(id);
        if (existingCourseOpt.isPresent()) {
            Course existingCourse = existingCourseOpt.get();
            existingCourse.setTitle(updatedCourse.getTitle());
            existingCourse.setImage(updatedCourse.getImage());
            existingCourse.setPrice(updatedCourse.getPrice());
            return courseRepository.save(existingCourse);
        } else {
            throw new RuntimeException("Course not found with id: " + id);  // Handle not found case
        }
    }

}

