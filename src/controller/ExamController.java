package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import service.ExamDao;

@Controller
public class ExamController {
    @Autowired
    ExamDao examDao;
}
