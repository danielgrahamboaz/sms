package com.sms.ums.models.dtos;

import com.sms.ums.models.entities.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeDTO {
    private String id;
    private String name;
    private Level level;
}
