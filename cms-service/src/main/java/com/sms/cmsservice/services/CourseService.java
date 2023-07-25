package com.sms.cmsservice.services;

import com.mongodb.DuplicateKeyException;
import com.mongodb.MongoException;
import com.sms.cmsservice.dto.CourseRequest;
import com.sms.cmsservice.dto.CourseResponse;
import com.sms.cmsservice.models.Course;
import com.sms.cmsservice.models.Grade;
import com.sms.cmsservice.models.Programme;
import com.sms.cmsservice.respositories.CourseRepository;
import com.sms.cmsservice.respositories.GradeRepository;
import com.sms.cmsservice.respositories.ProgrammeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseService {

    private final CourseRepository courseRepository;
    private final GradeRepository gradeRepository;
    private final ProgrammeRepository programmeRepository;

    public ResponseEntity<?> createCourse(CourseRequest courseRequest) throws Exception {
        // check if grade ids exist
        Set<String> gradeIds = courseRequest.getGradeIds();
        Set<Grade> grades = new HashSet<>();

        // check if programme id exists
        String programmeId = courseRequest.getProgrammeId();
        Programme programme = programmeRepository.findById(programmeId)
                .orElseThrow(() -> new Exception("Programme not found"));

        if (gradeIds == null || gradeIds.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Course must have at least one grade"));
        }

        if (programmeId.equals("")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Course must have a programme"));
        }

        if (programme == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Programme not found"));
        }


        try {
            for (String gradeId : gradeIds) {
                Grade grade = gradeRepository.findById(gradeId)
                        .orElseThrow(() -> new Exception("Grade not found"));

                grades.add(grade);
            }

            Course course = Course.builder()
                    .name(courseRequest.getName())
                    .description(courseRequest.getDescription())
                    .programmeId(courseRequest.getProgrammeId())
                    .grades(grades)
                    .build();

            var savedCourse = courseRepository.save(course);

            log.info("Course created: {}", course);

            return ResponseEntity.ok(CourseResponse.builder()
                    .id(savedCourse.getId())
                    .name(savedCourse.getName())
                    .description(savedCourse.getDescription())
                    .grades(savedCourse.getGrades())
                    .programme(programme)
                    .build());

        } catch (Exception e) {
            log.error("Course create error: {}", e.getLocalizedMessage());

            return ResponseEntity.badRequest().body(Map.of("message", e.getLocalizedMessage()));
        }

    }

    public Set<CourseResponse> getCourses() {
        Set<CourseResponse> courseResponses = new HashSet<>();

        courseRepository.findAll().forEach(course -> {
            courseResponses.add(CourseResponse.builder()
                    .id(course.getId())
                    .name(course.getName())
                    .description(course.getDescription())
                    .grades(course.getGrades())
                    .programme(programmeRepository.findById(course.getProgrammeId()).orElse(null))
                    .build());
        });

        return courseResponses;
    }

    public CourseResponse getCourseById(String id) {
        Course course = courseRepository.findById(id).orElse(null);

        log.info("Course: {}", course);

        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .description(course.getDescription())
                .grades(course.getGrades())
                .programme(programmeRepository.findById(course.getProgrammeId()).orElse(null))
                .build();
    }

//    public void updateCourse(String id, CourseRequest courseRequest) {
//        Course course = courseRepository.findById(id).orElse(null);
//        Programme programme = programmeRepository.findById(courseRequest.getProgrammeResponse().getId()).orElse(null);
//
//        if (course != null) {
//            course.setName(courseRequest.getName());
//            course.setDescription(courseRequest.getDescription());
//            course.setProgramme(programme);
//            course.setGrades(courseRequest.getGrades());
//
//            courseRepository.save(course);
//
//            log.info("Course updated: {}", course);
//        }
//    }

    public void deleteCourse(String id) {
        Course course = courseRepository.findById(id).orElse(null);

        if (course != null) {
            courseRepository.delete(course);

            log.info("Course deleted: {}", course);
        }
    }
}
