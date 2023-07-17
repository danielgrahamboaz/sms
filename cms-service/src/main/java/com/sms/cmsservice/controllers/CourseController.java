package com.sms.cmsservice.controllers;

import com.sms.cmsservice.dto.CourseRequest;
import com.sms.cmsservice.dto.CourseResponse;
import com.sms.cmsservice.models.Course;
import com.sms.cmsservice.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Set<Course> getCourses() {
        return courseService.getCourses();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CourseResponse getCourseById(@PathVariable(value = "id") String id) {
        return courseService.getCourseById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createCourse(@RequestBody CourseRequest courseRequest) throws Exception {
        return courseService.createCourse(courseRequest);
    }

//    @GetMapping("/update/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public void updateCourse(@PathVariable(value="id") String id, @RequestBody CourseRequest courseRequest) {
//        courseService.updateCourse(id, courseRequest);
//    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCourse(@PathVariable(value = "id") String id) {
        courseService.deleteCourse(id);
    }
}
