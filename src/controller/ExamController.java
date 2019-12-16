package controller;

import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.Exam;
import service.ExamDao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ExamController {
    @Autowired
    ExamDao examDao;

    @RequestMapping("/examList.action")
    @ResponseBody
    public Map<String, Object> selectLayUiTable_Page(HashMap hashMap) {
        HashMap<String, Object> map = new HashMap<>();
        List<Exam> exams = examDao.getExamList(hashMap);
        map.put("code",0);
        map.put("msg","");
        JSONArray data = JSONArray.fromObject(exams);
        map.put("data",data);
        return map;
    }
}
