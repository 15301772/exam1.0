package mapper;

import pojo.Exam;

import java.util.HashMap;
import java.util.List;

public interface ExamMapper {
    public List<Exam> getExamList(HashMap map);
}
