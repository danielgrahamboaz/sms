package com.sms.cmsservice.dto;

import com.sms.cmsservice.models.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgrammeResponse {
    private String id;
    private String name;
    private Level level;
}
