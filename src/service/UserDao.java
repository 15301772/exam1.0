package service;

import pojo.User;

import java.util.HashMap;
import java.util.List;

public interface UserDao {

    public User Login(User user);
    public int count(User user);
    public int loginDateTime(HashMap hashMap);
    public List<User> getUserList(HashMap hashMap);
    public int addUser(User user);
    public int delete(Integer id);
    public int update (User user);
}
