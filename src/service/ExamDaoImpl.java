package service;

import mapper.ExamMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pojo.Exam;

import java.util.HashMap;
import java.util.List;

@Service
public class ExamDaoImpl implements ExamDao {
    @Autowired
    ExamMapper examMapper;

    @Override
    public List<Exam> getExamList(HashMap map) { return examMapper.getExamList(map); }
}
