package com.sms.ums.controllers;

import com.sms.ums.clients.CourseClient;
import com.sms.ums.models.dtos.CourseDTO;
import com.sms.ums.models.dtos.TeacherDTO;
import com.sms.ums.models.dtos.TeacherResponse;
import com.sms.ums.models.entities.Teacher;
import com.sms.ums.models.entities.enums.Role;
import com.sms.ums.repositories.TeacherRepository;
import com.sms.ums.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/teachers")
@RequiredArgsConstructor
@Slf4j
public class TeacherController {
    private final TeacherRepository teacherRepository;
//    private final CourseRepository courseRepository;
    @Autowired
    private final CourseClient courseClient;
    private final AuthService authService;

    @GetMapping("")
    public ResponseEntity<?> getTeachers() {
        return ResponseEntity.ok(teacherRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTeacher(@PathVariable Long id) {
        Teacher teacher = teacherRepository.findById(id).orElse(null);

        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(teacher);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTeacher(@RequestBody TeacherDTO teacherDTO) {
        try {
            Teacher teacher = teacherRepository.findByUsernameOrEmail(teacherDTO.getFirstName() + "" + teacherDTO.getLastName(), teacherDTO.getEmail()).orElse(null);

            if (teacher != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Teacher already exists");
            }

            teacher = new Teacher();
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            teacher.setFirstName(teacherDTO.getFirstName());
            teacher.setLastName(teacherDTO.getLastName());
            teacher.setGender(teacherDTO.getGender());
            teacher.setEmail(teacherDTO.getEmail());
            teacher.setAddress(teacherDTO.getAddress());
            teacher.setPhoneNumber(teacherDTO.getPhoneNumber());

            teacher.setUserName(teacherDTO.getFirstName() + teacherDTO.getLastName());
            teacher.setPassword(passwordEncoder.encode(teacher.getLastName()));

            Set<Role> roles = new HashSet<>();
            roles.add(Role.TEACHER);
            teacher.setRole(roles);

//            Course course = courseRepository.findById((long) teacherDTO.getCourse_id()).orElse(null);
            CourseDTO course = courseClient.getCourseById(teacherDTO.getCourse_id());

            if (course == null) {
                return ResponseEntity.badRequest().body("Course can't be null");
            }

            teacher.setCourseId(course.getId());

//            var response = authService.registerToChatEngine(teacher.getUsername(), teacher.getPassword(), teacher.getEmail(), teacher.getFirstName(), teacher.getLastName());

//            if (response == null) {
//                log.error("Error while registering Teacher to chat engine");
//                return new ResponseEntity<>("Error while registering to chat engine", HttpStatus.INTERNAL_SERVER_ERROR);
//            }
            var savedTeacher = teacherRepository.save(teacher);

            var teacherData = TeacherResponse.builder().id(savedTeacher.getId()).firstName(savedTeacher.getFirstName()).lastName(savedTeacher.getLastName()).email(savedTeacher.getEmail()).gender(savedTeacher.getGender()).phoneNumber(savedTeacher.getPhoneNumber()).course(course).address(savedTeacher.getAddress()).build();

            return ResponseEntity.ok(Map.of("teacher", teacherData));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
