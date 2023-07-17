package com.sms.ums;

import com.sms.ums.models.entities.UserEntity;
import com.sms.ums.models.entities.enums.Role;
import com.sms.ums.repositories.StudentRepository;
import com.sms.ums.repositories.TeacherRepository;
import com.sms.ums.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;


@Component
@Slf4j
public class DBInit {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private StudentRepository studentRepository;
//    @Autowired
//    private CourseRepository courseRepository;

    @PostConstruct
    public void postConstruct() {
        log.info("DBInit: postConstruct");
        UserEntity userEntity;

        UserEntity adminUser = userRepository.findByUsernameOrEmail("admin", "admin@scolar.com").orElse(null);

        if (adminUser == null) {
            userEntity = UserEntity.builder()
                    .username("admin")
                    .email("admin@scolar.com")
                    .password(passwordEncoder.encode("admin"))
                    .role(Collections.singleton(Role.ADMIN))
                    .build();

            log.info("DBInit: userEntity: " + userEntity);
            userRepository.save(userEntity);
        } else {
            log.info("DBInit: Admin User Exists!" + adminUser.getEmail());
        }

//        Teacher
//        Teacher teacherUser = teacherRepository.findByUsernameOrEmail("johnteacher", "johnteacher@scolar.com").orElse(null);
//        Student studentUser = studentRepository.findByUsernameOrEmail("johnstudent", "johnstudent@gmail.com").orElse(null);

//        if (teacherUser == null) {
//            teacherUser = new Teacher();
//            teacherUser.setFirstName("John");
//            teacherUser.setLastName("Teacher");
//            teacherUser.setEmail("johnteacher@gmail.com");
//            teacherUser.setAddress("1234 Main Street");
//            teacherUser.setPhoneNumber("1234567890");
//            teacherUser.setPassword(passwordEncoder.encode("123456"));
//            teacherUser.setUserName(teacherUser.getFirstName() + "" + teacherUser.getLastName());
//            teacherUser.setRole(Collections.singleton(Role.TEACHER));
//
//            Optional<Course> course = courseRepository.findByName("English");
//            System.out.println("course = " + course);
//            Course course_ = course.get();
//            teacherUser.setCourse(course_);
//
//            teacherRepository.save(teacherUser);
//
//        } else {
//            log.info("DBInit: Teacher User Exists!" + teacherUser.getEmail());
//        }


    }
}
