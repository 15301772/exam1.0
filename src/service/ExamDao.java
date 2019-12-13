package service;

import pojo.Exam;

import java.util.HashMap;
import java.util.List;

public interface ExamDao {
    public List<Exam> getExamList(HashMap map);
}
