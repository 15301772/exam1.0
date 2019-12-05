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
    public String login(@RequestBody User user) {
        HttpSession session = request.getSession();
        User loginUser = userDao.Login(user);
        if (loginUser != null) {
            //重定向
            session.setAttribute("user", loginUser);
            return "success";
        } else {
            return "fail";
        }
    }

    @RequestMapping("selectLayUitable_Page.action")
    @ResponseBody
    public Map<String, Object> selectLayUitable_Page(int page, int limit,User user) {
        HashMap<String, Object> map = new HashMap<>();
        int pageStart = (page - 1) * limit;
        map.put("pagestart", pageStart);
        map.put("size", limit);
//        map.put("user_name",user.getUser_name());
//        map.put("user_major",user.getUser_major());
        List<User> users = userDao.select(map);
        Integer pagecount = userDao.userCount();
        Map map1=new HashMap();
        map1.put("code",0);
        map1.put("msg","");
        map1.put("count",pagecount);
        JSONArray data = JSONArray.fromObject(users);
        map1.put("data",data);
        return map1;

    }
}
