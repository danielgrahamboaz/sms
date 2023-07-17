package com.sms.cmsservice.services;

import com.sms.cmsservice.dto.GradeResponse;
import com.sms.cmsservice.models.Grade;
import com.sms.cmsservice.respositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GradeService {

    private final GradeRepository gradeRepository;

    public List<GradeResponse> getGrades() {
        List<Grade> grades = gradeRepository.findAll();

        log.info("Grades: {}", grades);

        return grades.stream()
                .map(grade -> GradeResponse.builder()
                        .id(grade.getId())
                        .name(grade.getName())
                        .level(grade.getLevel())
                        .build())
                .collect(Collectors.toList());
    }

    public GradeResponse getGradeById(String id) {
        Grade grade = gradeRepository.findById(id).orElse(null);

        log.info("Grade: {}", grade);

        return grade != null ? GradeResponse.builder()
                .id(grade.getId())
                .name(grade.getName())
                .level(grade.getLevel())
                .build() : null;
    }

    public GradeResponse createGrade(GradeResponse gradeResponse) {
        Grade grade = Grade.builder()
                .name(gradeResponse.getName())
                .level(gradeResponse.getLevel())
                .build();

        gradeRepository.save(grade);

        log.info("Grade created: {}", grade);

        return GradeResponse.builder()
                .id(grade.getId())
                .name(grade.getName())
                .level(grade.getLevel())
                .build();
    }
}
