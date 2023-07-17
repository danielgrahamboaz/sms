package com.sms.cmsservice.controllers;

import com.sms.cmsservice.dto.ProgrammeRequest;
import com.sms.cmsservice.dto.ProgrammeResponse;
import com.sms.cmsservice.services.ProgrammeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programmes")
@RequiredArgsConstructor
public class ProgrammeController {

    private final ProgrammeService programmeService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProgrammeResponse> getProgrammes() {
        return programmeService.getProgrammes();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ProgrammeResponse getProgrammeById(@PathVariable(value="id") String id) {
        return programmeService.getProgrammeById(id);
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public ProgrammeResponse createProgramme(@RequestBody ProgrammeRequest programmeRequest) {
        return programmeService.createProgramme(programmeRequest);
    }
}
