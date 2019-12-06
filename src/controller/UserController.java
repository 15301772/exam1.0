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
        return loginUser;
    }

    @RequestMapping("/userList.action")
    @ResponseBody
    public Map<String, Object> selectLayUitable_Page(User user) {
        HashMap<String, Object> map = new HashMap<>();
//        int pageStart = (page - 1) * limit;
//        map.put("pagestart", pageStart);
//        map.put("size", limit);
//        map.put("user_name",user.getUser_name());
//        map.put("user_major",user.getUser_major());
        List<User> users = userDao.getUserList(user);
//        Integer pagecount = userDao.userCount();
//        Map map=new HashMap();
        map.put("code",0);
        map.put("msg","");
//        map1.put("count",pagecount);
        JSONArray data = JSONArray.fromObject(users);
        map.put("data",data);
        return map;

    }
}
