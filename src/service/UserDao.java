package service;

import pojo.User;

import java.util.HashMap;
import java.util.List;

public interface UserDao {

    public User Login(User user);

    public List<User> getUserList(User user);

}
