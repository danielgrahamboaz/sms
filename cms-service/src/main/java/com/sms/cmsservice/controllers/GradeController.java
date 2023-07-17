package com.sms.cmsservice.controllers;

import com.sms.cmsservice.dto.GradeResponse;
import com.sms.cmsservice.services.GradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@RequiredArgsConstructor
public class GradeController {

    private final GradeService gradeService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<GradeResponse> getGrades() {
        return gradeService.getGrades();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public GradeResponse getGradeById(@PathVariable(value="id") String id) {
        return gradeService.getGradeById(id);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public GradeResponse createGrade(@RequestBody GradeResponse gradeResponse) {
        return gradeService.createGrade(gradeResponse);
    }
}
