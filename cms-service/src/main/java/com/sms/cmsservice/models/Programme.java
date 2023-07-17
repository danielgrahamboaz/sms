package com.sms.cmsservice.models;

import com.sms.cmsservice.models.enums.Level;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "programmes")
@Builder
public class Programme {
    @Id
    private String id;
    @Field
    @Indexed(unique = true)
    private String name;
    private Level level;
}
