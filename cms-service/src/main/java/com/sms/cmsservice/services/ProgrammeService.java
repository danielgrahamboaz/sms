package com.sms.cmsservice.services;

import com.sms.cmsservice.dto.ProgrammeRequest;
import com.sms.cmsservice.dto.ProgrammeResponse;
import com.sms.cmsservice.models.Programme;
import com.sms.cmsservice.respositories.ProgrammeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProgrammeService {

    private final ProgrammeRepository programmeRepository;

    public List<ProgrammeResponse> getProgrammes() {
        List<Programme> programmes = programmeRepository.findAll();

        log.info("Programmes: {}", programmeRepository.findAll());

        return programmes.stream()
                .map(programme -> ProgrammeResponse.builder()
                        .id(programme.getId())
                        .name(programme.getName())
                        .level(programme.getLevel())
                        .build())
                .collect(Collectors.toList());
    }

    public ProgrammeResponse getProgrammeById(String id) {
        Programme programme = programmeRepository.findById(id).orElse(null);

        log.info("Programme: {}", programme);

        return programme != null ? ProgrammeResponse.builder()
                .id(programme.getId())
                .name(programme.getName())
                .level(programme.getLevel())
                .build() : null;
    }

    public ProgrammeResponse createProgramme(ProgrammeRequest programmeRequest) {
        Programme programme = Programme.builder()
                .name(programmeRequest.getName())
                .level(programmeRequest.getLevel())
                .build();

        programmeRepository.save(programme);

        log.info("Programme created: {}", programme);

        return ProgrammeResponse.builder()
                .id(programme.getId())
                .name(programme.getName())
                .level(programme.getLevel())
                .build();
    }

}
