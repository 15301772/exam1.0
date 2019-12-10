package controller;

import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pojo.User;
import service.UserDao;
import tool.TooL;
import util.PageUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {

    @Autowired
    UserDao userDao;

    @Autowired
    HttpServletRequest request;

    @RequestMapping("/login.action")
    @ResponseBody
    public User login(@RequestBody User user) {
        User loginUser = userDao.Login(user);
        HashMap<String, Object> map = new HashMap<>();
        map.put("id",loginUser.getId());
        map.put("userEndTime",new Date());
        userDao.loginDateTime(map);
        return loginUser;
    }

    @RequestMapping("/userList.action")
    @ResponseBody
    public Map<String, Object> selectLayUitable_Page(HashMap hashMap) {
        HashMap<String, Object> map = new HashMap<>();
        List<User> users = userDao.getUserList(hashMap);
        map.put("code",0);
        map.put("msg","");
        JSONArray data = JSONArray.fromObject(users);
        map.put("data",data);
        return map;

    }
}
