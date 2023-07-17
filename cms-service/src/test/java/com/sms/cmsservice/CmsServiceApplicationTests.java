package com.sms.cmsservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sms.cmsservice.dto.GradeRequest;
import com.sms.cmsservice.models.enums.Level;
import com.sms.cmsservice.respositories.GradeRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Testcontainers
@AutoConfigureMockMvc
class CmsServiceApplicationTests {

    @Container
    static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:6.0.7");

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private GradeRepository gradeRepository;

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry dynamicPropertyRegistry) {
        dynamicPropertyRegistry.add("spring.data.mongodb.uri", mongoDBContainer::getReplicaSetUrl);
    }

    @Test
    void shouldCreateGrade() throws Exception {
        GradeRequest gradeRequest = getGradeRequest();
        String gradeRequestStr = objectMapper.writeValueAsString(gradeRequest);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/grades/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gradeRequestStr))
                .andExpect(status().isCreated());

        Assertions.assertEquals(1, gradeRepository.findAll().size());
    }

    @Test
    void shouldGetGrades() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/grades"))
                .andExpect(status().isOk());
    }

    private GradeRequest getGradeRequest() {
        return GradeRequest.builder()
                .name("Class 3")
                .level(Level.ELEMENTARY)
                .build();
    }

}
