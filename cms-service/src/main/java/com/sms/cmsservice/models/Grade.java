package com.sms.cmsservice.models;

import com.sms.cmsservice.models.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "grades")
public class Grade {
    @Id
    private String id;
    @Field
    @Indexed(unique = true)
    private String name;
    private Level level;
}
